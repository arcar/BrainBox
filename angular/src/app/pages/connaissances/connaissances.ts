import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ConnaissanceService } from '../../../services/connaissance.service';
import { Connaissance } from '../../models/connaissance.model';


@Component({

  selector: 'app-connaissances',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],

  templateUrl: './connaissances.html',

  styleUrl: './connaissances.scss'

})
export class Connaissances implements OnInit {


  connaissances: Connaissance[] = [];


  connaissanceSelectionnee?: Connaissance;


  rechercheId = '';

  rechercheTag = '';


  chargement = false;




  constructor(

    private service: ConnaissanceService,

    private router: Router,
    private cd: ChangeDetectorRef

  ) {}





 ngOnInit(): void {

  console.log("INIT CONNAISSANCES");

  this.charger();

}




 charger(): void {

  console.log("APPEL CHARGER");


  this.service.getAllConnaissances()

    .subscribe({

      next: (data) => {


        console.log("DONNEES RECUES :", data);


        this.connaissances = [...data];


        this.chargement = false;


        this.cd.detectChanges();


      },


      error: (err) => {


        console.error(
          "ERREUR API :",
          err
        );


        this.chargement = false;


        this.cd.detectChanges();


      }

    });

}




  selectionner(
    item: Connaissance
  ): void {


    this.connaissanceSelectionnee = item;


  }





  chercherId(): void {
    console.log("CLIC RECHERCHE ID");

    if(!this.rechercheId)
      return;


    this.service

      .getConnaissanceParId(
        this.rechercheId
      )

      .subscribe({

        next:(data)=>{
          console.log("RESULTAT API :", data);
          this.connaissances = [data];
          this.cd.detectChanges();
        },

        error:(err)=>{

          console.error(err);

        }

      });


  }





  chercherTag(): void {


    if(!this.rechercheTag)
      return;


    this.service

      .getConnaissanceParTag(
        this.rechercheTag
      )

      .subscribe({

        next:(data)=>{

          this.connaissances = data;
          this.cd.detectChanges();
        },

        error:(err)=>{

          console.error(err);

        }

      });


  }





  modifier(): void {


    if(this.connaissanceSelectionnee?._id){


      this.router.navigate([

        '/connaissances/edit',

        this.connaissanceSelectionnee._id

      ]);


    }


  }





  supprimer(): void {


  if(!this.connaissanceSelectionnee?._id){

    return;

  }


  const id =
    this.connaissanceSelectionnee._id;


  this.service.deleteConnaissance(id)

    .subscribe({

      next:()=>{


        console.log(
          "Suppression OK"
        );


        this.connaissanceSelectionnee = undefined;


        this.charger();


      },


      error:(err)=>{


        console.error(
          "Erreur suppression :",
          err
        );


      }


    });


}

}