import { Component, OnInit } from '@angular/core';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {

  stats: Stat[] = [
    { value: '10+', label: 'Années d\'expérience', icon: 'bx-calendar' },
    { value: '500+', label: 'Clients satisfaits', icon: 'bx-user-check' },
    { value: '1000+', label: 'Produits vendus', icon: 'bx-package' },
    { value: '99%', label: 'Satisfaction client', icon: 'bx-smile' }
  ];

  team: TeamMember[] = [
    {
      name: 'Amadou Diallo',
      role: 'Fondateur & CEO',
      image: 'team1.jpg',
      description: 'Expert en e-commerce avec plus de 15 ans d\'expérience.'
    },
    {
      name: 'Fatou Sall',
      role: 'Directrice Marketing',
      image: 'team2.jpg',
      description: 'Spécialiste en stratégie digitale et communication.'
    },
    {
      name: 'Moussa Ndiaye',
      role: 'Responsable Produits',
      image: 'team3.jpg',
      description: 'Passionné par la qualité et l\'innovation.'
    }
  ];

  values = [
    {
      icon: 'bx-check-shield',
      title: 'Qualité Garantie',
      description: 'Nous sélectionnons rigoureusement nos produits pour vous garantir la meilleure qualité.'
    },
    {
      icon: 'bx-time-five',
      title: 'Livraison Rapide',
      description: 'Vos commandes sont traitées et livrées dans les meilleurs délais.'
    },
    {
      icon: 'bx-support',
      title: 'Support 24/7',
      description: 'Notre équipe est disponible pour répondre à toutes vos questions.'
    },
    {
      icon: 'bx-dollar-circle',
      title: 'Prix Compétitifs',
      description: 'Les meilleurs produits aux meilleurs prix du marché.'
    }
  ];

  ngOnInit(): void {
    // Initialisation du composant
  }
}
