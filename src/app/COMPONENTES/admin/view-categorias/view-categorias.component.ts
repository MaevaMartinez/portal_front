import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnInit, AfterViewInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoriaExamen } from 'src/app/interface/categoria-examen.interface';
import { CategoriaService } from 'src/app/service/categoria.service';

import Swal from 'sweetalert2';
import { AdvertenciaEliminarComponent } from '../../shared/advertencia-eliminar/advertencia-eliminar.component';
import { MatSnackBar } from '@angular/material/snack-bar';


const ELEMENT_DATA: CategoriaExamen[] = [];


@Component({
  selector: 'app-view-categorias',
  templateUrl: './view-categorias.component.html',
  styleUrls: ['./view-categorias.component.css']
})
export class ViewCategoriasComponent implements OnInit, AfterViewInit {

  displayedColumns: any[] = ['title', 'acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  filtro: string = '';
  originalDataCopy: CategoriaExamen[] = [];


  selectedAniosExpRange: number[] = [1, 10];


  selectedProductoNombre: string | undefined = "";
  inputContent: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoriaExamenService: CategoriaService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
 
  ) {}



  openDialogEliminar(event: any) {



    const dialogRef = this.dialog.open(AdvertenciaEliminarComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);

      if(result){
        //#endregionconsole.log()
        this.categoriaExamenService.eliminarCategoria(event.target.parentElement.id).subscribe({
          next:()=>{
            this._snackBar.open("Categoría eliminada","Cerrar",{
              duration: 4000
            })
            this.getExamCategories();
          },
          error:()=>{
            this._snackBar.open("Error al eliminar categoría","Cerrar",{
              duration: 4000
            })
          }
        })
      }
    });
  }


  ngOnInit(): void {
    this.getExamCategories();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  filterData() {
    let filteredArray = this.originalDataCopy;
  
    // Filtro por producto
    /*
    if (this.selectedProducto > 0) {
      const selectedProduct = this.productos.find(producto => producto.prd_id === this.selectedProducto);
      if (selectedProduct) {
        filteredArray = filteredArray.filter(element => element.usr_herr.includes(selectedProduct.prd_nom));
      }
    }*/
  

    console.log('Filtro de años de experiencia:', this.selectedAniosExpRange);
    console.log('Usuarios filtrados:', filteredArray);
  
    this.dataSource.data = filteredArray;
  }

  filterInput() {
    let filteredArray = this.originalDataCopy;
/*
    if (this.filtro && this.filtro.trim() !== '') {
      const filtroLowerCase = this.filtro.toLowerCase();
      filteredArray = filteredArray.filter(element => element.toLowerCase().includes(filtroLowerCase));
    }
*/
    this.dataSource.data = filteredArray;
  }
  
  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
  addNewCategory(event: Event){
    this.router.navigate(["/admin/add-categoria/"])
  }
  

  getExamCategories(): void {
    this.categoriaExamenService.listarCategorias().subscribe({
      next:(data: CategoriaExamen[]) => {
        console.log('Data llegada:', data);

        this.originalDataCopy = data;
        this.dataSource.data = data;
      },
      error:(error) => {
        console.log(error);
      }
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  editCategoria(event: any){
    const id = event.target.parentElement.id
    this.router.navigate(["/admin/actualizar-categoria/"+id])
  }
}


