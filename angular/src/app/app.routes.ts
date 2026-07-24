import { Routes } from '@angular/router';

import { Accueil } from './pages/accueil/accueil';
import { Connaissances } from './pages/connaissances/connaissances';
import { Chat } from './pages/chat/chat';
import { ConnaissancesForm } from './pages/connaissances-form/connaissances-form';

export const routes: Routes = [

  {
    path: '', component: Accueil
  },

  {
    path: 'connaissances', component: Connaissances
  },

  {
    path:'connaissances/new', component: ConnaissancesForm
},


{
    path:'connaissances/edit/:id', component: ConnaissancesForm
},

  {
    path: 'chat', component: Chat
  },

  {
    path: '**', redirectTo: ''
  }

];