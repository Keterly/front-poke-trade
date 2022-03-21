import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../service/pokeapi.service';
import { TradeapiService } from '../service/tradeapi.service';

@Component({
  selector: 'app-player-one',
  templateUrl: './player-one.component.html',
  styleUrls: ['./player-one.component.css']
})
export class PlayerOneComponent implements OnInit {
  pokemons: any[] = [] //lista dos pokemons retornados na api 
  count = 0 //numero de pokemons selecionados
  count2 = 0
  disabled = false //botão select
  disabledR = true // botão remove 
  disabled2 = false
  disabledR2 = true
  base_exp = 0 //para soma da base_experience dos selecionados
  base_exp2 = 0
  dif //para verificar se a troca é justa
  pokes_play_1 = Array() //lista dos pokemons trocados
  pokes_play_2 = Array()


  constructor(private pokeaiService: PokeapiService, private pokeTradeService: TradeapiService) { }


  ngOnInit(): void {
    //obtendo todos os pokemons
    this.pokeaiService.getPokemons().subscribe((res: any) => {
      console.log(res.results)
    // selecionando o pokemon de nome X
      res.results.forEach(e => {this.pokeaiService.getPokemon(e.name)
      .subscribe((resP: any) => {
        console.log(resP)
        this.pokemons.push(resP)
        console.log(this.pokemons)
      })
      })
    })
  }

  //Jogador 1

  //escolha do pokemon 
  select(name, base_experience){

    if (this.count >= 6){
      this.disabled = true;
      window.alert("Jogador 1, limite atingido. Você pode selecionar até 6 Pokemons. Exclua algum selecionado para escolher outro")
      return
    }
    else{
      this.disabled = false;
      this.disabledR = false
      this.pokes_play_1.push(" " + name)
      this.base_exp += Number(base_experience)
      console.log(this.pokes_play_1)
    }
    this.count++
    console.log(this.count)
    console.log(this.base_exp)
  }

  //remoção de um pokemon escolhido 
  remove(name, base_experience){
    if(this.count > 0){
    this.disabledR = false
    this.disabled = false
    this.count--
    this.base_exp -= Number(base_experience)
    //para remover o pokemon da lista de pokemons trocados, seu indice é identificado e removido do array
    //se um mesmo pokemon for escolhido varias vezes, seu nome será removido uma única vez a cada clique
    for( var i = 0; i < this.pokes_play_1.length; i++){ 
  
      if ( this.pokes_play_1[i] === " " + name) { 
        //remove 1 valor do indice x
          this.pokes_play_1.splice(i, 1); 
          console.log(this.pokes_play_1)
          return
      }
  }
  }
  else{
    this.disabledR = true;
    window.alert("Não há mais nada para excluir")

  }
  console.log(this.count)
  }
  

  //Jogador 2
  
  //escolha do pokemon 
  select2(name, base_experience){

    if (this.count2 >= 6){
      this.disabled2 = true;
      window.alert("Jogador 2, limite atingido. Você pode selecionar até 6 Pokemons. Exclua algum selecionado para escolher outro")
      return
    }
    else{
      this.disabled2 = false;
      this.disabledR2 = false;
      this.pokes_play_2.push(" " + name)
      this.base_exp2 += Number(base_experience)
      console.log(this.pokes_play_2)

    }
    this.count2++
    console.log(this.count2)
    console.log(this.base_exp2)
  }


  //remoção de um pokemon escolhido
  remove2(name, base_experience){
    if(this.count2 > 0){
      this.disabledR2 = false
      this.disabled2 = false
      this.count2--
      this.base_exp2 -= Number(base_experience)
      for( var i = 0; i < this.pokes_play_2.length; i++){ 
    
        if ( this.pokes_play_2[i] === " " + name) { 
            this.pokes_play_2.splice(i, 1); 
            console.log(this.pokes_play_2)
            return
        }
    }
    }
    else{
      this.disabledR2 = true;
      window.alert("Não há mais nada para excluir")

    }
    console.log(this.count2)
  }


  //Adição da jogada em database.json 
  insert(){
    var player_1 = this.pokes_play_1.toString().toUpperCase()
    var player_2 = this.pokes_play_2.toString().toUpperCase()
    console.log(player_1)

    var body = {value_trade: this.dif, player_1: player_1, player_2: player_2}
    this.pokeTradeService.insertTrade(body).subscribe(data => {console.log(data)})
  }

  //Troca de pokemons 
  trade(){
    if(this.count == 0 || this.count2 == 0 ){
      window.alert("Primeiro escolha os pokemons para a troca!")
      return
    }
    else{
    //para deixar os valores positivos e evitar um erro na troca
    if(this.base_exp > this.base_exp2){
      this.dif = this.base_exp - this.base_exp2
    }
    else{
    this.dif = this.base_exp2 - this.base_exp
    }
    //escolha do limite 20 para definir se a troca é justa
    if(this.dif <= 20){
      window.alert("Troca Justa")
      this.insert()
      window.location.reload()
    }
    else{
      window.alert("Troca Injusta")
      window.location.reload()
    }
  }
}
}



