import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { HttpModule, JsonpModule } from '@angular/http';

/** Chart JS */
import { ChartsModule } from 'ng2-charts';
import 'chart.js';

/** Components */
import { AppComponent } from './app.component';
import { TopComponent } from './top/top.component';
import { ChartComponent } from './chart/chart.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { MovieComponent } from './movie/movie.component';
import { TrailerComponent } from './trailer/trailer.component';
import { NavbarComponent } from './navbar/navbar.component';

/** Servicies */
import { MovieService } from './movie/movie.service';
import { TrailerService } from './trailer/trailer.service';

const routes: Routes = [
  { path: 'top', component: TopComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: '',
    redirectTo: '/top',
    pathMatch: 'full'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    TopComponent,
    ChartComponent,
    FavoriteComponent,
    MovieComponent,
    TrailerComponent,
    NavbarComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    MaterialModule,
    ChartsModule
  ],
  providers: [
    MovieService,
    TrailerService
  ],
  bootstrap: [AppComponent],
  entryComponents: [TrailerComponent]
})
export class AppModule { }
