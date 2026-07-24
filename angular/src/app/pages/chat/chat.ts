import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../services/chat.service';


@Component({

  selector: 'app-chat',

  standalone: true,

  imports: [
    FormsModule
  ],

  templateUrl: './chat.html',

  styleUrl: './chat.scss'

})
export class Chat {


  question = '';

  reponse = '';



  constructor(

    private service: ChatService,
    private cdr: ChangeDetectorRef

  ) {}





  envoyer(): void {


    if (!this.question.trim()) {

      return;

    }



    this.reponse = "BrainBox réfléchit...";



    this.service

      .poserQuestion(this.question)

      .subscribe({


        next:(data)=>{

 console.log("REPONSE BRAINBOX :", data);
          this.reponse = data.answer;
           this.cdr.detectChanges();

        },


        error:(err)=>{


          console.error(
            "Erreur Chat IA :",
            err
          );


          this.reponse =
            "Erreur lors de la communication avec BrainBox.";
          this.cdr.detectChanges();

        }


      });



  }


}