import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Imovel } from '../../models/imovel';
import { ImovelService } from '../../services/imovel.service';

@Component({
  selector: 'app-form-imovel',
  templateUrl: './form-imovel.component.html',
  styleUrls: ['./form-imovel.component.css']
})
export class FormImovelComponent implements OnInit {

  formImovel: FormGroup = this.fb.group({
    nome: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    foto: [''],
    tipo: ['', [ Validators.required ]],
    valor: ['', [ Validators.required]],
    condominio: ['', [ Validators.required]],
    quartos: ['', [ Validators.required]],
    banheiros: ['', [ Validators.required]],
    mobiliado: ['', [ Validators.required]],
    area: ['', [ Validators.required]],
    venda: ['', [ Validators.required]],
    aluguel: ['', [ Validators.required]],
    dataAnuncio: ['', [ Validators.required]],
    endereco: [
      {
        rua: ['', [ Validators.required]],
        numero: ['', [ Validators.required]],
        bairro: ['', [ Validators.required]],
        cidade: ['', [ Validators.required]],
        uf: ['', [ Validators.required]],
        cep: ['', [ Validators.required]]
      }
    ],
    proprietarioId: ['', [ Validators.required]],
  })

  foto!: File
  fotoPreview: string = ''
  salvandoImovel: boolean = false

  constructor(
    private fb: FormBuilder,
    private imvService: ImovelService,
    private dialogRef: MatDialogRef<FormImovelComponent>, 
    private snackbar: MatSnackBar 
  ) { }

  ngOnInit(): void {
  }

  recuperarFoto(event: any): void {
    this.foto = event.target.files[0]
    this.carregarPreview()
  }

  carregarPreview(): void {
    const reader = new FileReader()

    reader.readAsDataURL(this.foto)

    reader.onload = () => {
      this.fotoPreview = reader.result as string
    }
  }

  getEndereco(): FormGroup {
    return this.formImovel.get('endereco') as FormGroup
  }

  salvar(): void {
    this.salvandoImovel = true
    const i: Imovel = this.formImovel.value
    let obsSalvar: Observable<any>

    if (this.formImovel.value.foto.length > 0) {
      obsSalvar = this.imvService.salvarImovel(i, this.foto)
    } else {
      obsSalvar = this.imvService.salvarImovel(i)
    }

    obsSalvar.subscribe(
      (resultado) => {
        if (resultado instanceof Promise) {
          resultado.then((obs$) => {
            obs$.subscribe(
              () => {
                this.snackbar.open('Imóvel salvo com sucesso', 'Ok', {
                  duration: 3000
                })
                this.dialogRef.close()
              }
            )
          })
        } else {
          this.snackbar.open('Imóvel salvo com sucesso', 'Ok', {
            duration: 3000
          })
          this.dialogRef.close()
        }
      }
    )
  }
}
