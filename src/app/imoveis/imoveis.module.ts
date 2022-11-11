import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MaterialModule } from '../material/material.module';
import { imoveisRoutingModule } from './imoveis-routing.module';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ListarImoveisComponent } from './pages/listar-imoveis/listar-imoveis.component';


@NgModule({
  declarations: [
    ListarImoveisComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    imoveisRoutingModule
  ]
})
export class ImoveisModule { }
