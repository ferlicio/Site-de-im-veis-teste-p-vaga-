import { Component, Input, OnInit } from '@angular/core';
import { Imovel } from '../../models/imovel';

@Component({
  selector: 'imovel-card',
  templateUrl: './imovel-card.component.html',
  styleUrls: ['./imovel-card.component.css']
})
export class ImovelCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  imovel!: Imovel
  @Input()
  foto: any
}
