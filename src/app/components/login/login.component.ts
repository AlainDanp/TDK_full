import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit{
  @ViewChild('container', { static: false }) containerRef!: ElementRef;
  @ViewChild('registerBtn', { static: false }) registerBtnRef!: ElementRef;
  @ViewChild('loginBtn', { static: false }) loginBtnRef!: ElementRef;

  signupUsername = '';
  signupEmail = '';
  signupPassword = '';
  signupPhone = '';
  loginEmail = '';
  loginPassword = '';
  errorMessage = '';
  successMessage = '';
  showPassword = false;
  showPassword2 = false;

  isSubmitting = false;

  showSignupSuccess = false;
  signupSuccessMsg = 'Compte créé avec succès !';

  constructor(
    private readonly authService: AuthService,
    private readonly  router : Router
  ) {
  }

  ngAfterViewInit(): void {
    const container = this.containerRef.nativeElement as HTMLElement;
    const registerBtn = this.registerBtnRef.nativeElement as HTMLButtonElement;
    const loginBtn = this.loginBtnRef.nativeElement as HTMLButtonElement;

    registerBtn.addEventListener('click', () => {
      container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
      container.classList.remove('active');
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  togglePasswordVisibility2() {
    this.showPassword2 = !this.showPassword2;
  }

  onLogin() {
    const {loginEmail, loginPassword} = this

    this.authService.login(loginEmail, loginPassword).subscribe({
      next: () => {
        this.successMessage = 'Connexion réussie.';
        this.router.navigate(['/Home']);
      },
      error: () => {
        this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
        this.router.navigate(['/login']);
      }
    })
  }

  onRegister() {
    if (!this.signupEmail || !this.signupPassword || !this.signupUsername || !this.signupPhone) {
      return;
    }
    this.isSubmitting = true;

    this.authService.register({
      email: this.signupEmail,
      password: this.signupPassword,
      username: this.signupUsername,
      phoneNumber: this.signupPhone,
    }).subscribe({
      next: (msg) => {
        console.log('SUCCESS (component)', msg);
        // this.router.navigate(['/home']);
        this.showSignupSuccess = true;

        this.signupUsername = '';
        this.signupEmail = '';
        this.signupPassword = '';
        this.signupPhone = '';

        setTimeout(() => this.showSignupSuccess = false, 5000);
      },
      error: (err) => {
        console.error('REGISTER_FAILED', err);
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
  closeSignupSuccess() { this.showSignupSuccess = false; }
}
