import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [RouterModule, MatButtonModule, MatDividerModule, MatIconModule,CommonModule],
  standalone: true,
})
export class HomeComponent {
  deportes = [
    { img: 'img2.png', title: 'En VIVO' },
    { img: 'liga1.jpg', title: 'Fútbol Peruano' },
    { img: 'libertadores.png', title: 'Copa Libertadores' },
    { img: 'sudamerica.png', title: 'Copa Sudamericana' },
    { img: 'baloncesto.jpg', title: 'Baloncesto' },
    { img: 'euro.png', title: 'Euro League' },
    { img: 'bundes.png', title: 'Bundesliga' },
    { img: 'MX.png', title: 'Liga Mexicana' },
    { img: 'mls.png', title: 'MLS' },
    { img: 'nfl.png', title: 'NFL' }
  ];

  casinos = [
    { img: 'ca1.jpg', title: 'Burning Hot' },
    { img: 'c2.png', title: 'Sweet Bonanza' },
    { img: 'c4.png', title: 'Bell Girls' },
    { img: 'c5.png', title: 'Dragon\'s Realm' },
    { img: 'c6.png', title: 'Rise of Ra' },
    { img: 'c7.jpg', title: 'Le Pharaoh' },
    { img: 'c8.png', title: 'Gates of Olympus' },
    { img: 'c9.png', title: 'Donny Dough' },
    { img: 'c10.png', title: 'Mustang Money' }
  ];

  promociones = [
    { img: '/promos/promo1.jpg', title: 'Promo 1' },
    { img: '/promos/promo2.jpg', title: 'Promo 2' }
  ];
}
