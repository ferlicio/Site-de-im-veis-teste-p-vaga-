import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proprietario } from '../models/proprietario';

@Injectable({
  providedIn: 'root'
})
export class ProprietarioService {

  private readonly baseUrl: string = 'http://localhost:5875/proprietario/'

  constructor(
    private http: HttpClient,
  ) { }

  getProprietarios(): Observable<Proprietario[]> {

    return this.http.get<Proprietario[]>(this.baseUrl)
  }
}
