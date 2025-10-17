import { Component, AfterViewInit } from '@angular/core';
import ScrollReveal from 'scrollreveal';
import Swiper  from 'swiper';
import { Navigation, Pagination, EffectFade, Autoplay } from 'swiper/modules';

Swiper.use([Navigation, Pagination, EffectFade, Autoplay]);

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  constructor() {}
  ngAfterViewInit(): void {

   var swiper = new Swiper('.mySwiper', {
     spaceBetween: 30,
     effect: 'fade',
     loop: true,
     autoplay: {
       delay: 2000,
       disableOnInteraction: false,
     },
     navigation: {
       nextEl: '.swiper-button-next',
       prevEl: '.swiper-button-prev',
     },
     pagination: {
       el: '.swiper-pagination',
       clickable: true,
     },
    });

    if (swiper) {
      swiper.init();
    }
    const scrollRevealOption = {
      origin: 'bottom',
      distance: '50px',
      duration: 1000,
    };
    ScrollReveal().reveal('.header__image img', {
      ...scrollRevealOption,
      origin: 'right',
    });

    ScrollReveal().reveal('.header__content p', {
      ...scrollRevealOption,
      delay: 500,
    });

    ScrollReveal().reveal('.header__content h1', {
      ...scrollRevealOption,
      delay: 1000,
    });

    ScrollReveal().reveal('.header__btns', {
      ...scrollRevealOption,
      delay: 1500,
    });
    ScrollReveal().reveal('.circle', {
      ...scrollRevealOption,
      delay: 1500,
    });
    ScrollReveal().reveal('.container_card', {
      ...scrollRevealOption,
      interval: 500,
    });
    ScrollReveal().reveal('.hero', {
      ...scrollRevealOption,
      delay: 500,
    });
    ScrollReveal().reveal('.cta', {
      ...scrollRevealOption,
      delay: 1700,
    });
    ScrollReveal().reveal('.showcase_image', {
      ...scrollRevealOption,
      delay: 1500,
    });
    ScrollReveal().reveal('.showcase_content', {
      ...scrollRevealOption,
      delay: 1000,
    });
  }


}
