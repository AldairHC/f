import { Producto } from './../model/Producto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  productoActualizar= new Subject<Producto[]>();
  private baseURL = "http://localhost:8082/producto";
  constructor(private httpClient : HttpClient) { }
  //este metodo nos sirve para obtener los empleados
  ListarProductos():Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(`${this.baseURL}`);
  }

  eliminar(id:number){
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  editar(producto:Producto){
    return this.httpClient.put(this.baseURL,producto);
  }

  registrar(producto:Producto){
    return this.httpClient.post(this.baseURL,producto);
  }

}
