import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// import { interval, Observable, Observer, Subscription } from 'rxjs';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { CarrinhoService } from '../carrinho.service';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  // private tempoObservableSubscrition!: Subscription
  // private meuObservableTesteSubscrition!: Subscription

  public oferta!: Oferta

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
    ) { }

  ngOnInit(): void {

    // console.log('Array de itens do carrinho de compras-oferta: ',this.carrinhoService.exibirItens())

    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getOfertaPorId(parametros.id )
      .then(( oferta: Oferta) => {
        this.oferta = oferta
        // console.log(this.oferta);
      })

    })




    //   this.route.params.subscribe(
    //       (parametro: any) => {console.log(parametro)},
    //       (erro: any) => console.log(erro),
    //       () => console.log('processamento foi classificado como concluido')
    //  )

    // let tempo = interval(2000)

    // this.tempoObservableSubscrition = tempo.subscribe((intervalo: number) => {
    //   console.log(intervalo)
    // })

    // Observable (observavel)
    // let meuObservableTeste = new Observable((observer: Observer<number>) => {
    //     observer.next(1)
    //     observer.next(3)
    //     observer.complete()
    //     observer.next(5)
    // })

    // observable (observador)
  //   this.meuObservableTesteSubscrition = meuObservableTeste.subscribe(
  //     (resultado: number) => console.log(resultado + 10),
  //     (erro: string) => console.log(erro),
  //     () => console.log('stream de eventos foi finalizada')
  //   )
   }

  ngOnDestroy() {
    // this.meuObservableTesteSubscrition.unsubscribe()
    // this.tempoObservableSubscrition.unsubscribe()
  }

 public  adicionarItemCarrinho(): void {
   this.carrinhoService.incluirItem(this.oferta)
   console.log(this.carrinhoService.exibirItens())
 }

}
