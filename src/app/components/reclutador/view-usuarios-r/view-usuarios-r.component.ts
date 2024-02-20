import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { User } from 'src/app/interface/user.interface';
import { ProductCategory } from 'src/app/interface/categoria-prod.interface';
import { ProductoService } from 'src/app/service/producto.service';
import { Product } from 'src/app/interface/producto.interface';
import { ProductVersion } from 'src/app/interface/version-producto';
import { EditPerfilUsuarioRComponent } from '../edit-perfil-usuario-r/edit-perfil-usuario-r.component'; // Ajusta la ruta según tu estructura de carpetas
import { MatDialog } from '@angular/material/dialog';
import { ViewPerfilUsuarioRComponent } from '../view-perfil-usuario-r/view-perfil-usuario-r.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { viewCrudArchivoComponent } from '../view-crudarchivo/view-crudarchivo.component';
import * as Papa from 'papaparse';
import { ObservacionService } from 'src/app/service/observation.service';
import { CategoriaProductoService } from 'src/app/service/categoria-producto.service';
import { UserJobService } from 'src/app/service/user-job.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SendMailToUsersDialogueComponent } from '../send-mail-to-users-dialogue/send-mail-to-users-dialogue.component';
import { PreguntaService } from 'src/app/service/pregunta.service';
import { NivelService } from 'src/app/service/nivel.service';
import { Level } from 'src/app/interface/niveles.interface';
import { JobPositionService } from 'src/app/service/jobposition.service';
import { JobPosition } from 'src/app/interface/jobposition.interface';
import { AcademicaService } from 'src/app/service/academica.service';
import { HerramientasService } from 'src/app/service/herramientas.service';
import { Result } from 'src/app/interface/exam-results.interface';
import { ResultadosService } from 'src/app/service/resultados.service';

const ELEMENT_DATA: User[] = [];
@Component({
  selector: 'app-view-usuarios-r',
  templateUrl: './view-usuarios-r.component.html',
  styleUrls: ['./view-usuarios-r.component.css'],
})
export class ViewUsuariosRComponent implements OnInit, AfterViewInit {

  displayedColumns: any[] = ['name', 'phone', 'email', 'porcentajeAprobacion', 'acciones', 'seleccionar'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filtro: string = '';
  filtroPuntaje: string = '';
  filtroCargo: string = '';
  originalDataCopy: User[] = [];
  usuarios: any[] = [];
  categorias: ProductCategory[] = [];
  productos: Product[] = [];
  niveles: Level[] = [];
  versiones: ProductVersion[] = [];
  selectedfechaPostulacion: Date | null = null;
  selectedAniosExpRange: number[] = [1, 10];
  isIrrelevant: boolean = true;
  selectedCheckbox: FormGroup;
  selectedSueldoRange: number[] = [1, 5000000];
  selectedCargo: number = 0;
  selectedCategoria: number = 0;
  selectedProducto: number = 0;
  selectedProducts: number[] = []
  selectedVersion: number = 0;
  selectedAniosExp: number = 0;
  selectedProductoNombre: string | undefined = "";
  selectedEstado: string = '';

  lastYears: number = 0;
  resultadosExam: any[] = [];
  cargos: JobPosition[] = [];
  idUser: number = 0;
  filterCargo: string = '';
  resultados: any[] = [];
  porcentajeAprobacion: number = 0;
  filteredUsuarios: any = [] = [];
  puntosMaximos?: number;
  selectedNivel: number = 0;
  isSueldoSliderEnabled = true;
  porcentajesAprobacion = [
    { value: 100, label: '100%' },
    { value: [70, 99], label: '70% - 99%' },
    { value: [40, 69], label: '40% - 69%' }
  ];
  selectedPorcentajeAprobacion: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  herramientas: any;
  lvl: any;
  productname: any;
  productIds: any;
  productid: any;
  lvlid: any;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private observationService: ObservacionService,
    private preguntaService: PreguntaService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private categoriaProductoService: CategoriaProductoService,
    private productoService: ProductoService,
    public dialog: MatDialog,
    private _bottomSheet: MatBottomSheet,
    private nivelService: NivelService,
    private JobPositionService: JobPositionService,
    private resultadosService: ResultadosService,
    private UserJobService: UserJobService,
    private AcademicalReferences: AcademicaService,
    private herramientasService: HerramientasService
  ) {
    this.selectedCheckbox = this.fb.group({
    });
  }
  ngOnInit(): void {
    this.obtenerResultados();
    this.obtenerUsuarios();
    this.getCategories();
    this.obtenerResultadosByUser();
    this.getJobPosition();
    this.obtenerHerramientas();
    this.initializeDataSource();

  }
  getJobPosition() {
    this.JobPositionService.obtenerListaJobPosition().subscribe(
      (data: JobPosition[]) => {
        this.cargos = data;
      }
    )
  }
  toggleSueldoSlider() {
    this.isSueldoSliderEnabled = !this.isSueldoSliderEnabled;
  }
  obtenerResultados() {
    this.resultadosService.obtenerResultadosByUser().subscribe(
      (data: any) => {
        this.resultados = data;
        console.log("data", data);
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  initializeDataSource() {
    this.dataSource.sortingDataAccessor = this.customSortingAccessor.bind(this);
    this.dataSource.sort = this.sort;
  }

  customSortingAccessor(item: any, property: any) {
    if (property === 'porcentajeAprobacion') {
      return this.calculateUserResults(item.results);
    } else {
      return item[property];
    }
  }

  obtenerHerramientas() {
    this.herramientasService.getCurrentUserTools().subscribe(
      (herramientas: any) => {
        if (herramientas && herramientas.length > 0) {
          this.herramientas = herramientas
          this.lvl = herramientas.map((herramienta: any) => herramienta.level.description);
          this.productIds = herramientas.map((herramienta: any) => herramienta.productVersion.name);
          this.productname = herramientas.map((herramienta: any) => herramienta.productVersion.product.name);
          this.productid = herramientas.map((herramienta: any) => herramienta.productVersion.product.id);
          this.lvlid = herramientas.map((herramienta: any) => herramienta.level.id);
        } else {
          console.log('No se encontraron herramientas para el usuario.');
        }
      },
      (error) => {
        console.error('Error al obtener el usuario guardado:', error);
      }
    );
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  filterData() {
    let filteredArray: User[] = this.originalDataCopy;

    console.log("filtered array al principio", filteredArray)

    const [minSueldo, maxSueldo] = this.selectedSueldoRange;
    filteredArray = filteredArray.filter(usuario => {

      return usuario.userJob && usuario.userJob.some(cargo => {
        const sueldo = cargo.salary;
        return Number(sueldo) >= minSueldo && Number(sueldo) <= maxSueldo;
      });
    });

    //LISTO
    if (this.selectedCargo > 0) {

      filteredArray = filteredArray.filter(usuario => {
        return usuario.userJob?.find(application => {
          return String(application.jobPosition?.id) === String(this.selectedCargo);

        })
      });
    }

    //LISTO
    if (this.selectedfechaPostulacion) {
      const formattedSelectedFechaPostulacion = this.selectedfechaPostulacion.toISOString().split('T')[0];
      filteredArray = filteredArray.filter(usuario => {
        const cargos = usuario.userJob
        if (cargos && cargos.length > 0) {
          const primerCargo = cargos[0];
          const applicationDate = primerCargo.applicationDate
          if (!applicationDate) return false;
          return String(applicationDate).split('T')[0] === formattedSelectedFechaPostulacion;
        }
        return false;
      });
    }


    //LISTO
    // Filtro por estado de disponibilidad
    if (this.selectedEstado && this.selectedEstado !== '') {
      filteredArray = filteredArray.filter((usuario) => {
        return String(usuario.availability?.id) === String(this.selectedEstado)
      });
    }




    // Filtro por producto LISTO
    if (this.selectedProducts.length > 0) {
      filteredArray = filteredArray.filter(usuario => {
        return usuario.tools?.find(tool => {
          return this.selectedProducts.includes(tool.productVersion!.product!.id)
        });
      });
    }



    //Filtro por versión Necesita más testing pero debería estar bien
    if (this.selectedVersion > 0) {
      filteredArray = filteredArray.filter(usuario => {
        return usuario.tools?.find(tool => {
          return String(tool.productVersion!.id) === String(this.selectedVersion)
        });
      })
    }


    // Filtro por nivel de examen

    if (this.selectedNivel > 0 && this.selectedProducts.length === 1) {
      filteredArray = filteredArray.filter(usuario => {
        return usuario.results?.find(resultado => {
          return String(resultado.level.id) === String(this.selectedNivel)
            && String(resultado.product.id) === String(this.selectedProducts[0])
        })
      });
    }

    console.log("array final: ", filteredArray)

    // Filtro por porcentaje de aprobación

    if (typeof this.selectedPorcentajeAprobacion === "object") {
      filteredArray = filteredArray.filter(resultado => {
        const resultadoFinal = this.resultados.find(resultado => {
          const resultadoExamen = resultado.score;
          const puntosMaximos = 20;
          console.log("resultadoExamen", resultadoExamen);
          const nivelDificultad = resultado.level.description;
          const productos = resultado.product;
          const porcentajeAprobacion = (resultadoExamen / puntosMaximos) * 100;
          const cumpleFiltrosAnteriores = productos.length > 0 && productos.id === this.selectedProducto && nivelDificultad === this.selectedNivel;


          /* console.log("porcentajeAprobacion", porcentajeAprobacion);
           console.log("this.selectedProducto", this.selectedProducto);
           console.log("resultadoExamen", resultadoExamen);
           console.log("nivelDificultad", nivelDificultad);
           console.log("this.selectedNivel", this.selectedNivel);
           console.log("productos", productos);*/

          if (Array.isArray(this.selectedPorcentajeAprobacion.value)) {
            return porcentajeAprobacion >= this.selectedPorcentajeAprobacion.value[0] &&
              porcentajeAprobacion <= this.selectedPorcentajeAprobacion.value[1];
          } else {
            /*
            console.log("usuario", resultado.usuarioId);
            console.log("% aprobacion", porcentajeAprobacion);
            console.log("% aprobacion seleccionado", this.selectedPorcentajeAprobacion.value);
            console.log("comparacion", porcentajeAprobacion === this.selectedPorcentajeAprobacion.value);
            return porcentajeAprobacion === this.selectedPorcentajeAprobacion.value;*/
          }

          return false;
        });
        console.log("resultado final", resultadoFinal);
        if (resultadoFinal) {
          return true;
        }
        return false;
      })
    }

    //Filtro años de experiencia
    console.log("filtered array porcentaje aprob:", filteredArray)

    if (this.selectedProducts.length === 1 && !this.isIrrelevant) {
      const [min, max] = this.selectedAniosExpRange;
      filteredArray = filteredArray.filter(usuario => {
        let totalExperience = 0
        if (usuario.jobs) {
          for (const job of usuario.jobs) {
            totalExperience += this.calculateExperience(job.startDate, job.endDate);
          }
        }
        return totalExperience >= min && totalExperience <= max;
      });
    }

    console.log("final final filtered array:", filteredArray)

    this.dataSource.data = filteredArray;
  }

  calculateExperience(start: Date, end: Date) {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date(); // If end date is not provided, use the current date
    const recencyYears = new Date().getFullYear() - endDate.getFullYear();
    //Verifica experienca reciente si es requerido
    if (this.lastYears > 0) {
      if (this.lastYears < recencyYears) {
        return 0;
      }
    }
    const yearDifference = endDate.getFullYear() - startDate.getFullYear();
    const monthDifference = endDate.getMonth() - startDate.getMonth();
    const dayDifference = endDate.getDate() - startDate.getDate();

    // Adjust the result based on the month and day difference
    const adjustedDifference = monthDifference < 0 || (monthDifference === 0 && dayDifference < 0) ? yearDifference - 1 : yearDifference;
    return adjustedDifference;
  }


  onIrrelevanceChange() {
    if (this.isIrrelevant) {
      this.lastYears = 0;
    }
    this.filterData();
  }
  onLast5YearsChange() {
    this.filterData();
  }

  filterInput() {
    let filteredArray = this.originalDataCopy;
    if (this.filtro) {
      const filtroLowerCase = this.filtro.toLowerCase();
      filteredArray = filteredArray.filter(element => {
        if (element.name) {
          return element.name.toLowerCase().includes(filtroLowerCase);
        }
        return false;
      });
    }

    this.dataSource.data = filteredArray;
  }

  filterInputCargoOcupado() {
    let filteredArray = this.originalDataCopy;

    if (this.filtroCargo) {
      const filtroLowerCase = this.filtroCargo.toLowerCase();
      filteredArray = filteredArray.filter(usuario => {
        const cargo = usuario.jobs;
        if (cargo && cargo.length > 0) {
          const primerCargo = cargo[0];
          const cargoOcupado = primerCargo.position;
          if (cargoOcupado) {
            return cargoOcupado.toLowerCase().includes(filtroLowerCase);
          }
          return false;

        }
        return false;
      });
    }
    this.dataSource.data = filteredArray;
  }



  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  filterProducto(event: any) {

    this.selectedProducts = event.value;

    this.filterData();
  }
  filterNivel() {
    this.filterData();
  }
  filterPorcentaje() {
    this.filterData();
  }


  filterPuntaje() {
    this.filtroPuntaje = `Filtrado por puntaje: ${this.filtroPuntaje}`;
    this.filterData();
  }


  filterVersion() {
    if (this.selectedVersion === 0) {
      this.selectedAniosExpRange = [1, 10];
    }

    this.filterData();
  }

  filterAniosExp() {
    this.filterData();
  }

  obtenerUsuarios(): void {
    this.userService.getGuestUsers().subscribe({
      next: (data: User[]) => {
        console.log('Data de usuario :', data);

        const usuarios = data

        const controlNames = Object.keys(this.selectedCheckbox.controls);
        controlNames.forEach(controlName => {
          this.selectedCheckbox.removeControl(controlName);
        });


        usuarios.forEach(usuario => {
          this.selectedCheckbox.addControl(String(usuario.email), this.fb.control(false))
        });


        this.originalDataCopy = usuarios;
        this.dataSource.data = usuarios;
        console.log('esta es la datasource', this.dataSource.data)
      },
      error: (error) => {
        console.error('este es un error,', error);
      }
    });
  }
  calculateUserResults(results: Result[]) {
    const puntosMaximos = 20;
    if (results.length === 0) {
      return 0;
    }
    const maxResult: number = results.reduce((max, current) => {
      const score = current.score ?? 0;
      return score > max ? score : max;
    }, Number.NEGATIVE_INFINITY);
    const porcentajeAprobacionByUser = (maxResult / puntosMaximos) * 100;
    return porcentajeAprobacionByUser;
  }



  onSendMailPressed() {
    const values = this.selectedCheckbox.value

    const emails: any = []

    for (const key in values) {
      if (!values.hasOwnProperty(key)) { continue }
      const value = values[key];
      if (!value) { continue }
      emails.push(key)
    }

    const dialogRef = this.dialog.open(SendMailToUsersDialogueComponent, {
      data: { emails },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }



  clearDate() {
    this.selectedfechaPostulacion = null;
    this.filterData();
  }

  exportToCSV() {
    const dataToExport = this.dataSource.data;
    const csv = Papa.unparse(dataToExport);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'usuarios.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }



  getCategories() {
    this.categoriaProductoService.getCategoriasDisponibles().subscribe(
      (data: ProductCategory[]) => {
        this.categorias = data;
      },
      () => {
        console.log('Error al obtener categorías:');
      }
    );
  }




  obtenerYFiltrarResultados() {
    console.log('Llamando a obtenerResultadosByUser para el usuario con ID:', this.idUser);

    this.resultadosService.obtenerResultadosByUser().subscribe(
      (resultadoUsuario: any) => {


        // Aquí puedes verificar si los datos recibidos son lo que esperas
        this.dataSource.data = this.originalDataCopy.filter(usuario => {
          // Añadir un console.log dentro del filtro para ver qué está pasando
          const esIgual = this.resultados === resultadoUsuario;
          console.log('Comparando resultados - User:', usuario, '¿Es igual?:', esIgual);

          return esIgual;
        });

        // Mostrar los datos filtrados
        console.log('Datos después de aplicar el filtro:', this.dataSource.data);
      },
      (error: any) => {
        console.error('Error al obtener resultados del usuario: ', error);
      }
    );

  }
  obtenerResultadosByUser() {
    this.resultadosService.obtenerResultadosByUser().subscribe(
      (data: any) => {
        this.resultados = data;
        console.log('Resultados obtenidos aaaa:', this.resultados);
      },
      (error: any) => {
        console.error('Error al obtener resultados:', error);
      }
    );
  }



  getProductos(categoriaId: number) {

    this.selectedVersion = 0;
    this.selectedProductoNombre = '';
    this.filterInput();
    if (categoriaId) {
      this.productoService.getProductsByCategory(categoriaId).subscribe(
        (productos: Product[]) => {
          this.productos = productos;
          this.versiones = [];
          //this.filterProducto();
          this.selectedProductoNombre = this.productos.find((producto) => producto.id === this.selectedProducto)?.name;

        },
        (error) => {
          console.error('Error al cargar productos ', error);
        }
      );
    } else {
      this.versiones = [];
      this.productos = [];
      this.selectedProductoNombre = '';
      //this.filterProducto();
    }
  }


  getVersion(event: any) {

    console.log("selected products", event.value[0])

    if (event.value.length === 1) {
      this.productoService.getVersionByProduct(event.value[0]).subscribe(
        (data: ProductVersion[]) => {
          this.versiones = data;

        },
        (error) => {
          console.error('Error al cargar version ', error);
        }
      );
    }
  }

  getNiveles() {

    this.nivelService.listarNiveles().subscribe(
      (data: Level[]) => {
        this.niveles = data;

      },
      (error) => {
        console.error('Error al obtener niveles ', error);
      }
    );

  }

  // numbertoString(results:number){
  //   return String(results)

  // }



  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  botonEstadistica(event: any) {
    event.preventDefault()
    const elementId = event.target.parentElement.id
    console.log('Element ID:', elementId);

    this.router.navigate([
      "reclutador/estadisticas"

    ])

  }




  openUserProfile(usuario: User) {

    console.log('User DEL BOTON PERFIL CLICKADO:', usuario); // Imprime el ID del usuario en la consola


    // Configura el tamaño del diálogo
    const dialogRef = this.dialog.open(ViewPerfilUsuarioRComponent, {
      data: { usuario }, // Pasa los datos del usuario al componente hijo
      height: '60vh', // Establece la altura del diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.obtenerUsuarios();
    });

  }


  isAnyCheckboxChecked(): boolean {
    return Object.values(this.selectedCheckbox.controls).some(control => control.value);
  }



  openBottomSheet(event: any) {
    const userId = event.currentTarget.id;
    console.log('User ID:', userId);
    // Abre el componente hijo y pasa userId como un parámetro de datos
    this._bottomSheet.open(viewCrudArchivoComponent, {
      data: { userId: userId }
    });
  }


  openEditProfileDialog(event: any): void {
    // Obtiene el ID desde el elemento del botón que dispara el evento
    const id = event.target.parentElement.id;

    if (id) {
      // Llama al servicio para obtener los datos del usuario usando el ID
      this.userService.getUsuarioId(id).subscribe({
        next: (data) => {
          console.log('Data llegada:', data);
          // Abre el diálogo con los datos obtenidos
          const dialogRef = this.dialog.open(EditPerfilUsuarioRComponent, {
            width: '800px',
            height: '700px',
            data: { usuarioId: id } // Pasa el ID del usuario al diálogo
          });

          // Maneja el resultado después de que el diálogo se cierre
          dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
            this.obtenerUsuarios();
          });
        },
        error: (error) => {
          console.error(error);
          // Maneja el error aquí, por ejemplo, mostrando un mensaje al usuario
        }
      });
    } else {
      console.error('No se pudo obtener el ID del usuario');
    }
  }


  clearFilters(): void {
    this.filtro = '';
    this.filtroPuntaje = '';
    this.filtroCargo = '';
    this.selectedfechaPostulacion = null;
    this.selectedAniosExpRange = [1, 10];
    this.isIrrelevant = true;
    this.selectedSueldoRange = [1, 5000000];
    this.selectedCargo = 0;
    this.selectedCategoria = 0;
    this.selectedVersion = 0;
    this.selectedAniosExp = 0;
    this.selectedProductoNombre = "";
    this.selectedEstado = '';
    this.lastYears = 0;
    this.resultadosExam = [];
    this.selectedNivel = 0;
    this.isSueldoSliderEnabled = true;
    this.selectedPorcentajeAprobacion = undefined;
    this.porcentajeAprobacion = 0;
    this.selectedProducts = []

    // Vuelve a cargar o filtrar los datos según sea necesario
    this.dataSource.data = this.originalDataCopy;
  }





}