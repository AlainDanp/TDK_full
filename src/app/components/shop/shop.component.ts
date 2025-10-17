import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  query = '';
  onSearch() {
    // TODO: navigation ou filtre
    console.log('search:', this.query);
  }

}
