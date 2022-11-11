import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { CepService } from 'src/app/CEP/services/cep.service';
import { Proprietario } from 'src/app/proprietarios/models/proprietario';
import { ProprietarioService } from 'src/app/proprietarios/services/proprietario.service';
import { endereco } from '../../models/endereco';
import { Imovel } from '../../models/imovel';
import { ImovelService } from '../../services/imovel.service';

@Component({
  selector: 'app-form-imovel',
  templateUrl: './form-imovel.component.html',
  styleUrls: ['./form-imovel.component.css']
})
export class FormImovelComponent implements OnInit {

  formImovel: FormGroup = this.fb.group({
    nome: ['', ],
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
    proprietarioId: ['', [ Validators.required]],
    cep: ['', [ Validators.required]],
    rua: ['', [ Validators.required]],
    numero: ['', [ Validators.required]],
    bairro: ['', [ Validators.required]],
    cidade: ['', [ Validators.required]],
    uf: ['', [ Validators.required]],
  })

  proprietarios: Proprietario[] = []
  foto!: File
  fotoPreview: string = ''
  salvandoImovel: boolean = false

  constructor(
    private fb: FormBuilder,
    private imvService: ImovelService,
    private propService: ProprietarioService,
    private cepService: CepService,
    private dialogRef: MatDialogRef<FormImovelComponent>, 
    private snackbar: MatSnackBar 
  ) { }

  ngOnInit(): void {
    this.recuperarProprietarios()
    this.formImovel.patchValue({
      dataAnuncio: new Date()
    })
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

  getEndereco(cep:string): void {
    this.cepService.getEnderecoByCEP(cep).subscribe(
      (cep) => {
        this.formImovel.patchValue({
          rua: cep.logradouro,
          bairro: cep.bairro,
          cidade: cep.localidade,
          uf: cep.uf
        })
      },
    )
  }

  recuperarProprietarios(): void {
    this.propService.getProprietarios().subscribe(
      (props) => {
        this.proprietarios = props.reverse()
      },
      (erro) => { 
        console.log(erro)
      },
      () => {
        console.log('Dados enviados com sucesso')
      }
    )
  }

  salvar(): void {
    const endereco: endereco = {
      id: 0,
      cep: this.formImovel.get('cep')?.value,
      rua: this.formImovel.get('rua')?.value,
      numero: this.formImovel.get('numero')?.value,
      bairro: this.formImovel.get('bairro')?.value,
      cidade: this.formImovel.get('cidade')?.value,
      uf: this.formImovel.get('uf')?.value
    }

    this.salvandoImovel = true
    const i: Imovel = this.formImovel.value
    i.endereco = endereco
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
