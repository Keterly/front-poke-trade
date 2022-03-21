import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HistoryComponent } from './history/history.component';
import { PlayerOneComponent } from './player-one/player-one.component';

const routes: Routes = [
  {path: '', component: HistoryComponent},
  {path:'playone', component: PlayerOneComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
