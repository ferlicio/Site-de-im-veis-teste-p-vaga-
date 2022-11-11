import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ConfirmarDelecaoComponent } from './components/confirmar-delecao/confirmar-delecao.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImovelComponent } from './pages/imovel/imovel.component';
import { imovelRoutingModule } from './imovel-routing.module';


@NgModule({
  declarations: [
    ConfirmarDelecaoComponent,
    ImovelComponent
  ],
  imports: [
    CommonModule,
    imovelRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ImovelModule { }
