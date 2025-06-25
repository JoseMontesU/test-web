import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { RegistroComponent } from './modules/registro/registro.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegistroComponent },
    { path: '**', redirectTo: '' } // Redirect any unknown paths to home
];
