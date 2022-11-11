import { HttpClient } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, Observable, tap } from 'rxjs';
import { Imovel } from '../models/imovel';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {

  private readonly baseUrl: string = 'http://localhost:5875/imovel/'
  atualizarImoveisSub$: BehaviorSubject<boolean> = new BehaviorSubject(true)

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage
  ) { }

  getImoveis(): Observable<Imovel[]> {

    return this.http.get<Imovel[]>(this.baseUrl)
  }

  deleteImovel(imv: Imovel): Observable<any> {

    if (imv.foto != null && imv.foto.length > 0 ) {
      return this.storage.refFromURL(imv.foto).delete()
      .pipe(
        mergeMap(() => {
          return this.http.delete<any>(`${this.baseUrl}/${imv.id}`)
          .pipe( 
            tap((imovel) => {
              this.atualizarImoveisSub$.next(true)
            })
          )
        })
      )
    }

    return this.http.delete<any>(`${this.baseUrl}/${imv.id}`)
    .pipe(
      tap((imovel) => {
        this.atualizarImoveisSub$.next(true)
      })
    )
  }

  getImovelById(id: number): Observable<Imovel> {
    return this.http.get<Imovel>(`${this.baseUrl}/${id}`)
  }

  salvarImovel(imv: Imovel, foto?: File) { 
    if (foto == undefined) { 
      return this.http.post<Imovel>(this.baseUrl, imv)
    }

    return this.http.post<Imovel>(this.baseUrl, imv)
    .pipe(
      map(async (imovel) => {
        const linkFotoFirebase = await this.uploadImagem(foto)

        imovel.foto = linkFotoFirebase

        return this.atualizarImovel(imovel)
      })
    )
  }

  atualizarImovel(imv: Imovel, foto?: File): any {

    if (foto == undefined) {
      return this.http.put<Imovel>(`${this.baseUrl}/${imv.id}`, imv)
      .pipe(
        tap((imovel) => {
          this.atualizarImoveisSub$.next(true)
        })
      )
    }


    if (imv.foto.length > 0) {
      const inscricao = this.storage.refFromURL(imv.foto).delete()
      .subscribe(
        () => {
          inscricao.unsubscribe()
        }
      )
    }

    return this.http.put<Imovel>(`${this.baseUrl}/${imv.id}`, imv).pipe( 
      mergeMap(async (imovelAtualizado) => {
        const linkFotoFirebase = await this.uploadImagem(foto)

        imovelAtualizado.foto = linkFotoFirebase

        return this.atualizarImovel(imovelAtualizado)
      }),
      tap((imovel) => {
        this.atualizarImoveisSub$.next(true)
      })
    )
  }



  private async uploadImagem(foto: File): Promise<string> {

    const nomeDoArquivo = Date.now()

    const dados = await this.storage.upload(`${nomeDoArquivo}`, foto)

    const downloadURL = await dados.ref.getDownloadURL() 

    return downloadURL
  }
}
