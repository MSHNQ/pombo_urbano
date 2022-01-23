import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'src/app/ofertas.service';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [ OfertasService ]
})
export class ComoUsarComponent implements OnInit {

  public comoUsar: string = ''

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService
) { }

  ngOnInit(): void {

    this.route.parent?.params.subscribe((parametros: Params) => {
      console.log("ID da rota pai: ", )
      this.ofertasService.getComoUsarOfertaPorId(parametros.id)
        .then((descricao: string) => {
            this.comoUsar = descricao
        })
    })

     
  }

}
