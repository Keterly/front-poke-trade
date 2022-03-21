import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PokeTrade } from '../poke-trade';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TradeapiService {


  constructor(private http: HttpClient) { }
  private url = "https://api-poke-trade.herokuapp.com/history"

  getHistory(): Observable<PokeTrade[]>{
    return this.http.get<PokeTrade[]>(this.url)
  }

  insertTrade(body): Observable<PokeTrade>{
    console.log('cheguei')
    return this.http.post<PokeTrade>(this.url, body)
  }
}
