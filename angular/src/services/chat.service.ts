import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ia } from '../app/models/ia.model';


@Injectable({
  providedIn: 'root'
})
export class ChatService {


  private apiUrl = 'http://localhost:3000';



  constructor(
    private http: HttpClient
  ) {}



  poserQuestion(question: string): Observable<Ia> {

    return this.http.post<Ia>(
      `${this.apiUrl}/ask`,
      {
        question
      }
    );

  }

}