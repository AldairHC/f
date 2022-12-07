import { Categoria } from './../model/Categoria';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private baseURL = "http://localhost:8082/categoria";
  constructor(private httpClient : HttpClient) { }
  //este metodo nos sirve para obtener los empleados
  listarCategoria():Observable<Categoria[]>{
    return this.httpClient.get<Categoria[]>(`${this.baseURL+"/Listar"}`);
  }

}
