import { map } from 'rxjs/operators';
import { URL_API } from './app.api';
import { Observable } from 'rxjs';
import { Pedido } from "./shared/pedido.model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable()
export class OrdemCompraService {

  constructor(private http: HttpClient) { }

  public efetivarCompra(pedido: Pedido): Observable<any> {

    let headers: HttpHeaders = new HttpHeaders()

    headers.append('Content-type', 'application/json')

    return this.http.post(
      `${URL_API}/pedidos`,
      pedido,
      {headers: headers}
      )
      .pipe(map((resposta: any) => {return resposta.id}))
  }
}
