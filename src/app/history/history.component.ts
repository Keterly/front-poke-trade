import { Component, OnInit } from '@angular/core';
import { PokeTrade } from '../poke-trade';
import { TradeapiService } from '../service/tradeapi.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {


  constructor(private pokeService: TradeapiService) { }
  public pokesTrade: PokeTrade[] = []

  ngOnInit(): void {
    this.pokeService.getHistory().subscribe(res => {
      this.pokesTrade = res.map(item => {
        return new PokeTrade(item.id, item.value_trade, item.player_1, item.player_2)
      })
      console.log('cheguei aqui')
    })
  }

}
