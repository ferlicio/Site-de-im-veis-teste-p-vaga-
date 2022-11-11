import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Imovel } from '../../models/imovel';
import { ImovelService } from '../../services/imovel.service';

@Component({
  selector: 'app-imovel',
  templateUrl: './imovel.component.html',
  styleUrls: ['./imovel.component.css']
})
export class ImovelComponent implements OnInit {

  imovel!: Imovel

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

  naoEncontrado: boolean = false

  constructor(
    private route: ActivatedRoute, // acessar os parâmetros da rota ativa
    private imvService: ImovelService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        let idImovel = parseInt(params.get('idImovel') ?? '0')
        this.recuperarImovel(idImovel)
      }
    )
  }

  recuperarImovel(id: number): void {
    this.imvService.getImovelById(id)
    .subscribe(
      imv => {

        this.imovel = imv

        this.formImovel.setValue({
          nome: this.imovel.nome,
          foto: this.imovel.foto,
          tipo: this.imovel.tipo,
          valor: this.imovel.valor,
          condominio: this.imovel.condominio,
          quartos: this.imovel.quartos,
          banheiros: this.imovel.banheiros,
          mobiliado: this.imovel.mobiliado,
          area: this.imovel.area,
          venda: this.imovel.venda,
          aluguel: this.imovel.aluguel,
          dataAnuncio: this.imovel.dataAnuncio,
          proprietarioId: this.imovel.proprietarioId,
          cep: this.imovel.endereco.cep,
          rua: this.imovel.endereco.rua,
          numero: this.imovel.endereco.numero,
          bairro: this.imovel.endereco.bairro,
          cidade: this.imovel.endereco.cidade,
          uf: this.imovel.endereco.uf,
        })

      },
      (erro: HttpErrorResponse) => {
        this.naoEncontrado = erro.status == 404
      }
    )
  }

}
