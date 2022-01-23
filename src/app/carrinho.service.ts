import { Oferta } from './shared/oferta.model';
import { ItemCarrinho } from "./shared/item-carrinho.model";
export class CarrinhoService {
  public itens: ItemCarrinho[] = []

  public exibirItens(): ItemCarrinho[] {
    return this.itens
  }

  public incluirItem(oferta: Oferta): void {
    let itemCarrinho: ItemCarrinho = new ItemCarrinho(
      oferta.id,
      oferta.imagens[0],
      oferta.titulo,
      oferta.descricao_oferta,
      oferta.valor,
      1
    )
    //verificar se o item
    let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id)
    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade = itemCarrinhoEncontrado.quantidade + 1
    } else {
      this.itens.push(itemCarrinho)
    }
  }

  public totalCarrinhoCompras(): number {
    let total: number = 0
    this.itens.map((item: ItemCarrinho) => {
      total = total + (item.valor * item.quantidade)
    })
    return total
  }

  public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
    console.log(itemCarrinho)
    //incrementar quantidade
    let itemCarrinhoEncontrado = this.itens.find(
      (item: ItemCarrinho) => item.id === itemCarrinho.id
      );
    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade += 1;
    }
  }

  public diminuirQuantidade(itemCarrinho: ItemCarrinho): void{
    console.log(itemCarrinho)
    //decrementar quantidade
    let itemCarrinhoEncontrado = this.itens.find(
      (item: ItemCarrinho) => item.id === itemCarrinho.id
      );
    if (itemCarrinhoEncontrado) {
      itemCarrinhoEncontrado.quantidade -= 1;
      if(itemCarrinhoEncontrado.quantidade === 0) {
       this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1)
      }
    }
  }

  public limparCarrinho(): void {
    this.itens = []
  }
}