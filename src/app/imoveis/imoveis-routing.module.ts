import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarImoveisComponent } from './pages/listar-imoveis/listar-imoveis.component';

const routes: Routes = [
  {
    path: '',
    component: ListarImoveisComponent,
    
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class imoveisRoutingModule { }