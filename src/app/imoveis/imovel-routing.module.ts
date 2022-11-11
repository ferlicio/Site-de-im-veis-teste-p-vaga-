import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PodeSairGuard } from './guards/pode-sair.guard';
import { ImovelComponent } from './pages/imovel/imovel.component';

const routes: Routes = [
  {
    path: '',
    component: ImovelComponent,
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
export class imovelRoutingModule { }