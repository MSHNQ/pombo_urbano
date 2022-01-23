import { Observable, Subject, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas!: Observable<Oferta[]>

  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
    this.ofertas = this.subjectPesquisa // retorno de array de ofertas[]
      .pipe(debounceTime(1000))  //executa a acao do switchMap apos 1 segundo
      .pipe(distinctUntilChanged()) //para fazer pesquisas distintas
      .pipe(switchMap((termo: string) => {

          if(termo.trim() === '') {
            //retornar um observable de array de ofertas vazio
            return of<Oferta[]>([])
          }
          return this.ofertasService.pesquisaOfertas(termo)
      }))
      .pipe(catchError((err: any) => {
        return of<Oferta[]>([])
      }))

  }

  public pesquisa(termoDaBusca: string): void {
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('')
  }
}
