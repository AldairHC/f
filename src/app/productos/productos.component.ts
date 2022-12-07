import { Producto } from './../model/Producto';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ProductoService } from '../service/producto.service';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ProductosModalComponent } from './productos-modal/productos-modal.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {
  displayedColumns=['codProducto','nombre','cantidad','precio','categoria','editar-eliminar']
  dataSource:MatTableDataSource<Producto>

  constructor(
  private dialog:MatDialog,
    private productoService:ProductoService){}


  ngOnInit(): void {
    this.productoService.productoActualizar.subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
    })

    this.listarProductos();
    }

    private listarProductos(){
      this.productoService.ListarProductos().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
      });
  }

  openModal(producto?:Producto){
   let product = producto != null ? producto:new Producto();
this.dialog.open(ProductosModalComponent,{
  width:'260px',
  data:product
})
  }

  onDelete(id:number){
    let dialogRef = this.dialog.open(ConfirmDialogComponent,{
    });
    dialogRef.afterClosed().subscribe(estado =>{
      if(estado){
        this.productoService.eliminar(id).subscribe(()=>{
          this.productoService.ListarProductos().subscribe(data=>{
            this.dataSource = new MatTableDataSource(data)
          })
        })
      }
    })

  }

  filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
