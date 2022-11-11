import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Imovel } from '../../models/imovel';
import { ImovelService } from '../../services/imovel.service';
import { ConfirmarDelecaoComponent } from '../../components/confirmar-delecao/confirmar-delecao.component';
import { FormImovelComponent } from '../../components/form-imovel/form-imovel.component';

@Component({
  selector: 'app-listar-imoveis',
  templateUrl: './listar-imoveis.component.html',
  styleUrls: ['./listar-imoveis.component.css']
})
export class ListarImoveisComponent implements OnInit {
  imoveis: Imovel[] = []

  constructor(
    private imvService: ImovelService,
    private dialog: MatDialog, 
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {

    this.imvService.atualizarImoveisSub$
    .subscribe(
      (precisaAtualizar) => {
        if (precisaAtualizar) {
          this.recuperarImoveis()
        }
      }
    )
  }

  deletarImovel(imv: Imovel): void {

    const dialogRef = this.dialog.open(ConfirmarDelecaoComponent)

    dialogRef.afterClosed()
    .subscribe(
      (deletar) => {
        if (deletar == true) {
          this.imvService.deleteImovel(imv)
          .subscribe(
            () => {
              this.snackbar.open('Imóvel deletado', 'Ok', {
                duration: 3000
              })
              this.recuperarImoveis()
            },
            (error) => {
              this.snackbar.open('Não foi possível deletar o imóvel', 'Ok', {
                duration: 3000
              })
              console.log(error)
            }
          )
        }
      }
    )
  }

  recuperarImoveis(): void {
    this.imvService.getImoveis().subscribe(
      (imvs) => { 
        this.imoveis = imvs.reverse()
      },
      (erro) => { 
        console.log(erro)
      },
      () => { 
        console.log('Dados enviados com sucesso')
      }
    )
  }

  abrirFormImoveis(): void {
    const referenciaDialog = this.dialog.open(FormImovelComponent)
    referenciaDialog.afterClosed().subscribe(
      () => {
        this.recuperarImoveis()
      }
    )
  }
}
