import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Connaissance } from '../app/models/connaissance.model';


@Injectable({
  providedIn: 'root'
})
export class ConnaissanceService {


  private apiUrl = 'http://localhost:3000';



  constructor(
    private http: HttpClient
  ){}



  // GET ALL

  getAllConnaissances(): Observable<Connaissance[]> {

    return this.http.get<Connaissance[]>(
      `${this.apiUrl}/allConnaissances`
    );

  }



  // GET PAR ID

 getConnaissanceParId(id: string) {

  return this.http.get<Connaissance>(

    `${this.apiUrl}/ConnaissanceParId/${id}`

  );

}


  // GET PAR TAG

  getConnaissanceParTag(tags:string): Observable<Connaissance[]> {

    return this.http.get<Connaissance[]>(
      `${this.apiUrl}/ConnaissanceParTag/${tags}`
    );

  }



  // POST

  addConnaissance(
    connaissance:Connaissance
  ){

    return this.http.post(
      `${this.apiUrl}/addConnaissance`,
      connaissance
    );

  }



  // DELETE

  deleteConnaissance(id:string){

    return this.http.delete(
      `${this.apiUrl}/deleteConnaissance/${id}`
    );

  }



  // PUT

  modifConnaissance(
    id:string,
    connaissance:Connaissance
  ){

    return this.http.put(
      `${this.apiUrl}/modifConnaissance/${id}`,
      connaissance
    );

  }


}