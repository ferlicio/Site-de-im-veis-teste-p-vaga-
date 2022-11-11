import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MaterialModule } from '../material/material.module';
import { imoveisRoutingModule } from './imoveis-routing.module';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ListarImoveisComponent } from './pages/listar-imoveis/listar-imoveis.component';
import { FormImovelComponent } from './components/form-imovel/form-imovel.component';
import { ConfirmarDelecaoComponent } from './components/confirmar-delecao/confirmar-delecao.component';
import { ConfirmarSaidaComponent } from './components/confirmar-saida/confirmar-saida.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImovelCardComponent } from './components/imovel-card/imovel-card.component';


@NgModule({
  declarations: [
    ListarImoveisComponent,
    FormImovelComponent,
    ConfirmarDelecaoComponent,
    NavbarComponent,
    ConfirmarSaidaComponent,
    ImovelCardComponent
  ],
  imports: [
    CommonModule,
    imoveisRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ImoveisModule { }
