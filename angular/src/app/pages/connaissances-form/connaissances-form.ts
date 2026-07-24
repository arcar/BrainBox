import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConnaissanceService } from '../../../services/connaissance.service';
import { Connaissance } from '../../models/connaissance.model';


@Component({

  selector: 'app-connaissances-form',

  standalone: true,

  imports: [
    FormsModule,
    CommonModule
  ],

  templateUrl: './connaissances-form.html',

  styleUrl: './connaissances-form.scss'

})
export class ConnaissancesForm implements OnInit {

instance = Math.random();
  modeModification = false;

  id?: string;


  tagsTexte = '';



  connaissance: Connaissance = {

  title:'',

  content:'',

  tags:[],

  color:'#E3F2FD',

  pinned:false,

  archived:false

};





  constructor(

    private service: ConnaissanceService,

    private route: ActivatedRoute,

    private router: Router,
    private cdr: ChangeDetectorRef

  ) {}

chargement = true;



  ngOnInit(): void {

     console.log(
    "INSTANCE TS :",
    this.instance
  );
  this.id = this.route.snapshot.paramMap.get('id') ?? undefined;


  console.log("ID MODIFICATION :", this.id);



  if(this.id) {


    this.modeModification = true;

    this.chargerConnaissance();


  }
  else {


    this.chargement = false;


  }


}





  chargerConnaissance(): void {

  this.chargement = true;


  this.service
    .getConnaissanceParId(this.id!)
    .subscribe({

      next:(data)=>{

            console.log(
    "DONNEE RECUE POUR MODIF :",
    data
  );

        this.connaissance = {

          ...data,

          color: data.color || '#E3F2FD',

          tags:data.tags || [],

          pinned:data.pinned ?? false,

          archived:data.archived ?? false

        };


        this.tagsTexte =
          this.connaissance.tags.join(', ');


       console.log("AVANT FALSE :", this.chargement);

this.chargement = false;

this.cdr.detectChanges();

console.log("APRES FALSE :", this.chargement);


      },


      error:(err)=>{

        console.error(err);

        this.chargement = false;

      }

    });

}




  enregistrer(): void {


    this.connaissance.tags = this.tagsTexte

      .split(',')

      .map(tag => tag.trim())

      .filter(tag => tag.length > 0);




    if(this.modeModification) {


      this.modifier();


    }

    else {


      this.ajouter();


    }


  }






  ajouter(): void {


    this.service

      .addConnaissance(
        this.connaissance
      )

      .subscribe({

        next: () => {


          this.router.navigate([
            '/connaissances'
          ]);


        },


        error:(err)=>{


          console.error(
            "Erreur création :",
            err
          );


        }

      });


  }







  modifier(): void {


    this.service

      .modifConnaissance(

        this.id!,

        this.connaissance

      )

      .subscribe({

        next:()=>{


          this.router.navigate([
            '/connaissances'
          ]);


        },


        error:(err)=>{


          console.error(
            "Erreur modification :",
            err
          );


        }

      });


  }







  annuler(): void {


    this.router.navigate([
      '/connaissances'
    ]);


  }


}