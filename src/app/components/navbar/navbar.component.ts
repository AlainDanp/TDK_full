import {Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private readonly auth: AuthService, private readonly router: Router) {
  }
  @ViewChild('navLinks') navLinksRef!: ElementRef;
  @ViewChild('menuBtnIcon') menuBtnIconRef!: ElementRef;

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  closeMenu() {
    this.menuOpen = false;
  }
  get menuIconClass(): string {
    return this.menuOpen ? 'ri-close-line' : 'ri-menu-line';
  }
  onLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
    this.closeMenu();
  }
}
