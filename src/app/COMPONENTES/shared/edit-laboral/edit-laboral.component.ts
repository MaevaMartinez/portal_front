import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LaboralService } from 'src/app/service/laboral.service';
import { Laboral } from 'src/app/interface/laboral.interface';
import { HerramientaData } from 'src/app/interface/herramienta-data.interface';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HerramientasService } from 'src/app/service/herramientas.service';

@Component({
  selector: 'app-edit-laboral',
  templateUrl: './edit-laboral.component.html',
  styleUrls: ['./edit-laboral.component.css']
})
export class  EditLaboralComponent implements OnInit {
  [x: string]: any;
  @Output()  EditLaboralComponent: EventEmitter<void> = new EventEmitter<void>();
  creationMode: boolean = false;
  laborales: Laboral[] = [];
  id: number | null | undefined = null;
  today;
  form!: FormGroup;
  checkboxFormCreated = false;
  herramientasDisponibles!: HerramientaData[];
  herrIdList: number[] = [];
  navigateToRoute: any;
 

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute, private router: Router,
    private herramientaService:HerramientasService, 
    private laboralService: LaboralService,
    @Inject(MAT_DIALOG_DATA) public data: any, // Datos pasados al diálogo
    ) {
    this.today = new Date().toISOString().split('T')[0];
    this.buildForm();
  }



  ngOnInit(): void {
    this.id = this.data.inf_lab_id;
    if (this.id) {
      this.obtenerLaboralesGuardados(this.id);
    }

    
  }

  ngAfterViewInit() {
    console.log("Ejecutando ngAfterViewInit con id:", this.id ?? 0);
    this.obtenerLaboralesGuardados(this.id ?? 0);
  }
  



  private buildForm() {
    this.form = this.formBuilder.group({
      inf_lab_crg_emp: ["", [Validators.required]],
      inf_lab_emp: ["", [Validators.required]],
      inf_lab_act: ["", [Validators.required]],
      inf_lab_fec_ini: ["", [Validators.required]],
      inf_lab_fec_fin: ["", [Validators.required]],
    });

    this.generateHerrForm();
  }




  obtenerLaboralesGuardados(id: number) {
    this.laboralService.obtenerLaboralPorId(id).subscribe({
      next: (data:Laboral[]) => {
        this.form.patchValue(data);
      },
      error: (err) => console.log(err)
    });
  }



  goBack() {
    // Restablecer el formulario a su estado inicial
    this.form.reset();
  
    // Cerrar todas las ventanas de diálogo abiertas
    this.dialog.closeAll();
  }
  


  generateHerrForm(){

    
    this.herramientaService.getHerramientasByUserId().subscribe({
      next:(data: HerramientaData[])=>{
        
        console.log("recieved data herramientas: ",data)
        this.herramientasDisponibles = data;
   
        this.herramientasDisponibles.forEach((herramienta)=>{

          let wasCheckedAlready = false

      
          
          const newControl = new FormControl(wasCheckedAlready);
          this.form.addControl(herramienta.herr_usr_id.toString(), newControl);
  
          this.herrIdList.push(herramienta.herr_usr_id)
       

        })
     
        this.checkboxFormCreated = true;
      },
      error:(err: any)=>{
        console.log(err)
      }
    })

  }


 

  redirectTo(){
    this.navigateToRoute('/user/cargo-usuario')
  }


  submitForm(event: Event) {
    // Prevenir el comportamiento por defecto del evento submit para evitar que la página se recargue
    event.preventDefault();
  
    // Comprobar si el formulario es válido
    if (this.form.valid) {
      console.log("Formulario válido, guardando:", this.form.value);
  
      // Extraer la información del formulario y preparar el objeto para enviar
      const laboralNueva: Laboral = this.form.value;
  
      // Preparar el arreglo de herramientas seleccionadas
      let herramientasFinal: HerramientaData[] = [];
      this.herrIdList.forEach(id => {
        // Verificar si la herramienta fue seleccionada en el formulario
        if (this.form.get(id.toString())?.value === true) {
          // Crear el objeto HerramientaData
          let herra: HerramientaData = {
            herr_usr_id: id,
            herr_is_cert: false,
            herr_nvl: "",
            herr_usr_anos_exp: "",
            versionProducto: {
              vrs_id: 0,
              vrs_name: "",
              prd: {
                prd_id: 0,
                prd_nom: "",
                cat_prod_id: {
                  cat_prod_id: 0,
                  cat_prod_nom: ""
                }
              }
            }
          };
          herramientasFinal.push(herra);
        }
      });
  
      // Asignar el arreglo de herramientas al objeto laboral
      laboralNueva.herramientas = herramientasFinal;
  
      // Imprimir la información laboral completa que se enviará
      console.log("Información laboral a guardar:", laboralNueva);
  
      // Llamar al servicio para guardar la información laboral
      this.laboralService.guardarLaboral(laboralNueva, this.id).subscribe(
        (laboralGuardada: Laboral) => {
          // Si el guardado es exitoso, imprimir el resultado y realizar acciones adicionales si son necesarias
          console.log('Información laboral guardada:', laboralGuardada);
          this.creationMode = false; // Por ejemplo, cambiar el modo del formulario a no creación
  
          // Actualizar la lista de experiencias laborales
          this.laboralService.obtenerListaLaboralPorUsuario().subscribe({
            next:(data) => {
              this.laborales = data;
                // Cierra el diálogo después de guardar los cambios
                this.EditLaboralComponent.emit();
                this.dialog.closeAll();
            },
            error:(err) => {
              console.error('Error al obtener la lista de experiencias laborales:', err);
            }
          });
        },
        (error) => {
          // Si ocurre un error en el guardado, imprimir el error en la consola
          console.error('Error al guardar la información laboral:', error);
        }
      );
    } else {
      // Si el formulario no es válido, imprimir los errores del formulario
      console.log('Cancelado : No se guardó el formulario');
      // Aquí puedes agregar la lógica para manejar un formulario inválido, como mostrar mensajes de error al usuario
    }
  }
  




  

}
