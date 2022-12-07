import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from './../../model/Producto';
import { ProductoService } from './../../service/producto.service';
import { Categoria } from 'src/app/model/Categoria';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos-modal',
  templateUrl: './productos-modal.component.html',
  styleUrls: ['./productos-modal.component.css']
})
export class ProductosModalComponent implements OnInit{

  producto:Producto;
  categoria:Categoria[];

constructor(
  private dialogRef: MatDialogRef<ProductosModalComponent>,
  private categoriaService: CategoriaService,
private productoService: ProductoService,
@Inject(MAT_DIALOG_DATA) private data: Producto){}

  ngOnInit(): void {
    this.producto = new Producto();
    this.producto.codProducto=this.data.codProducto;
    this.producto.nombre=this.data.nombre;
    this.producto.cantidad=this.data.cantidad;
    this.producto.precio=this.data.precio;
    this.producto.categoria=this.data.categoria;
    this.categoriaService.listarCategoria().subscribe(data =>{
    this.categoria=data;
    })
  }

  aceptar(){
    if(this.producto !=null && this.producto.codProducto >0){
      this.productoService.editar(this.producto).subscribe(()=>{
        return this.productoService.ListarProductos().subscribe(data=>{
          this.productoService.productoActualizar.next(data);
        })
      });
    }else{
      this.productoService.registrar(this.producto).subscribe(()=>{
        this.productoService.ListarProductos().subscribe(data=>{
          this.productoService.productoActualizar.next(data);
        })
      })
    }

this.cancelar();
  }

  cancelar(){
this.dialogRef.close();
  }
}
