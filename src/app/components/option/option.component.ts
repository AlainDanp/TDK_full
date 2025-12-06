import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: string;
}

interface Settings {
  twoFactorEnabled: boolean;
  notificationsEnabled: boolean;
  darkModeEnabled: boolean;
  language: string;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
  items: number;
}

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  zipCode: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiryDate: string;
  isDefault: boolean;
}

@Component({
  selector: 'app-option',
  standalone: false,
  templateUrl: './option.component.html',
  styleUrl: './option.component.css'
})
export class OptionComponent implements OnInit {

  // ========== DONNÉES ==========
  userProfile: UserProfile = {
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    phone: '+33 6 12 34 56 78',
    avatar: 'https://ui-avatars.com/api/?name=Jean+Dupont&size=200&background=0f427a&color=fff&bold=true',
    role: 'Membre Premium'
  };

  settings: Settings = {
    twoFactorEnabled: false,
    notificationsEnabled: true,
    darkModeEnabled: false,
    language: 'Français'
  };

  // Exemple de commandes
  orders: Order[] = [
    { id: '12345', date: '2025-01-15', total: 89.99, status: 'Livrée', items: 3 },
    { id: '12344', date: '2025-01-10', total: 149.99, status: 'En transit', items: 5 },
    { id: '12343', date: '2025-01-05', total: 59.99, status: 'Livrée', items: 2 }
  ];

  // Exemple d'adresses
  addresses: Address[] = [
    {
      id: '1',
      name: 'Domicile',
      street: '123 Rue de la Paix',
      city: 'Paris',
      zipCode: '75001',
      isDefault: true
    },
    {
      id: '2',
      name: 'Bureau',
      street: '456 Avenue des Champs',
      city: 'Paris',
      zipCode: '75008',
      isDefault: false
    }
  ];

  // Exemple de moyens de paiement
  paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'Visa',
      last4: '4242',
      expiryDate: '12/26',
      isDefault: true
    },
    {
      id: '2',
      type: 'Mastercard',
      last4: '5555',
      expiryDate: '09/25',
      isDefault: false
    }
  ];

  appVersion = '1.0.0';

  // ========== ÉTATS DES MODALS ==========
  showDeleteModal = false;
  showEditProfileModal = false;
  showOrdersModal = false;
  showAddressesModal = false;
  showPaymentMethodsModal = false;
  showPasswordModal = false;
  showLanguageModal = false;
  showAddAddressModal = false;
  showAddPaymentModal = false;

  // Données temporaires pour les formulaires
  tempProfile = { ...this.userProfile };
  tempAddress: Address = {
    id: '',
    name: '',
    street: '',
    city: '',
    zipCode: '',
    isDefault: false
  };
  tempPayment: PaymentMethod = {
    id: '',
    type: 'Visa',
    last4: '',
    expiryDate: '',
    isDefault: false
  };
  passwordData = {
    current: '',
    new: '',
    confirm: ''
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadSettings();
    this.loadUserProfile();
  }

  // ========== CHARGEMENT DES DONNÉES ==========
  loadSettings(): void {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      this.settings = JSON.parse(savedSettings);
    }
  }

  loadUserProfile(): void {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      this.userProfile = JSON.parse(savedProfile);
    }
  }

  saveSettings(): void {
    localStorage.setItem('userSettings', JSON.stringify(this.settings));
  }

  // ========== GESTION DU PROFIL ==========
  changeProfilePhoto(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.userProfile.avatar = e.target.result;
          localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
          this.showSuccess('Photo de profil mise à jour !');
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  }

  editProfile(): void {
    this.tempProfile = { ...this.userProfile };
    this.showEditProfileModal = true;
  }

  saveProfile(): void {
    if (!this.tempProfile.name || !this.tempProfile.email) {
      this.showError('Veuillez remplir tous les champs obligatoires');
      return;
    }

    this.userProfile = { ...this.tempProfile };
    localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
    this.showEditProfileModal = false;
    this.showSuccess('Profil mis à jour avec succès !');
  }

  // ========== COMMANDES ==========
  viewOrders(): void {
    this.showOrdersModal = true;
  }

  getStatusColor(status: string): string {
    const colors: any = {
      'Livrée': 'green',
      'En transit': 'orange',
      'En préparation': 'blue',
      'Annulée': 'red'
    };
    return colors[status] || 'gray';
  }

  // ========== ADRESSES ==========
  manageAddresses(): void {
    this.showAddressesModal = true;
  }

  openAddAddressModal(): void {
    this.tempAddress = {
      id: Date.now().toString(),
      name: '',
      street: '',
      city: '',
      zipCode: '',
      isDefault: this.addresses.length === 0
    };
    this.showAddAddressModal = true;
  }

  saveAddress(): void {
    if (!this.tempAddress.name || !this.tempAddress.street || !this.tempAddress.city || !this.tempAddress.zipCode) {
      this.showError('Veuillez remplir tous les champs');
      return;
    }

    if (this.tempAddress.isDefault) {
      this.addresses.forEach(addr => addr.isDefault = false);
    }

    this.addresses.push({ ...this.tempAddress });
    this.showAddAddressModal = false;
    this.showSuccess('Adresse ajoutée avec succès !');
  }

  deleteAddress(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer cette adresse ?')) {
      this.addresses = this.addresses.filter(addr => addr.id !== id);
      this.showSuccess('Adresse supprimée');
    }
  }

  setDefaultAddress(id: string): void {
    this.addresses.forEach(addr => addr.isDefault = addr.id === id);
    this.showSuccess('Adresse par défaut mise à jour');
  }

  // ========== MOYENS DE PAIEMENT ==========
  paymentMethods_open(): void {
    this.showPaymentMethodsModal = true;
  }

  openAddPaymentModal(): void {
    this.tempPayment = {
      id: Date.now().toString(),
      type: 'Visa',
      last4: '',
      expiryDate: '',
      isDefault: this.paymentMethods.length === 0
    };
    this.showAddPaymentModal = true;
  }

  savePaymentMethod(): void {
    if (!this.tempPayment.last4 || !this.tempPayment.expiryDate) {
      this.showError('Veuillez remplir tous les champs');
      return;
    }

    if (this.tempPayment.isDefault) {
      this.paymentMethods.forEach(pm => pm.isDefault = false);
    }

    this.paymentMethods.push({ ...this.tempPayment });
    this.showAddPaymentModal = false;
    this.showSuccess('Moyen de paiement ajouté !');
  }

  deletePaymentMethod(id: string): void {
    if (confirm('Voulez-vous vraiment supprimer ce moyen de paiement ?')) {
      this.paymentMethods = this.paymentMethods.filter(pm => pm.id !== id);
      this.showSuccess('Moyen de paiement supprimé');
    }
  }

  setDefaultPayment(id: string): void {
    this.paymentMethods.forEach(pm => pm.isDefault = pm.id === id);
    this.showSuccess('Moyen de paiement par défaut mis à jour');
  }

  // ========== SÉCURITÉ ==========
  changePassword(): void {
    this.passwordData = { current: '', new: '', confirm: '' };
    this.showPasswordModal = true;
  }

  savePassword(): void {
    if (!this.passwordData.current || !this.passwordData.new || !this.passwordData.confirm) {
      this.showError('Veuillez remplir tous les champs');
      return;
    }

    if (this.passwordData.new.length < 6) {
      this.showError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (this.passwordData.new !== this.passwordData.confirm) {
      this.showError('Les mots de passe ne correspondent pas');
      return;
    }

    // Ici vous appelleriez votre API
    this.showPasswordModal = false;
    this.showSuccess('Mot de passe changé avec succès !');
  }

  toggleTwoFactor(): void {
    if (this.settings.twoFactorEnabled) {
      this.showSuccess('Authentification à deux facteurs activée !');
    } else {
      this.showSuccess('Authentification à deux facteurs désactivée');
    }
    this.saveSettings();
  }

  twoFactorAuth(): void {
    alert('Configuration de l\'authentification à deux facteurs...');
  }

  privacySettings(): void {
    alert('Paramètres de confidentialité...');
  }

  // ========== PRÉFÉRENCES ==========
  toggleNotifications(): void {
    if (this.settings.notificationsEnabled) {
      this.showSuccess('Notifications activées !');
    } else {
      this.showSuccess('Notifications désactivées');
    }
    this.saveSettings();
  }

  notificationSettings(): void {
    alert('Paramètres de notifications détaillés...');
  }

  languageSettings(): void {
    this.showLanguageModal = true;
  }

  selectLanguage(lang: string): void {
    this.settings.language = lang;
    this.saveSettings();
    this.showLanguageModal = false;
    this.showSuccess(`Langue changée en ${lang}`);
  }

  toggleDarkMode(): void {
    if (this.settings.darkModeEnabled) {
      document.body.classList.add('dark-mode');
      this.showSuccess('Mode sombre activé !');
    } else {
      document.body.classList.remove('dark-mode');
      this.showSuccess('Mode sombre désactivé');
    }
    this.saveSettings();
  }

  // ========== AIDE ET SUPPORT ==========
  contactSupport(): void {
    alert('Redirection vers le formulaire de contact...');
  }

  faq(): void {
    alert('Redirection vers la FAQ...');
  }

  termsConditions(): void {
    alert('Redirection vers les conditions d\'utilisation...');
  }

  // ========== ACTIONS CRITIQUES ==========
  logout(): void {
    const confirmLogout = confirm('Êtes-vous sûr de vouloir vous déconnecter ?');
    if (confirmLogout) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userProfile');
      this.showSuccess('Déconnexion réussie !');
      this.router.navigate(['/login']);
    }
  }

  confirmDeleteAccount(): void {
    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
  }

  deleteAccount(): void {
    const finalConfirm = prompt('Cette action est irréversible. Tapez "SUPPRIMER" pour confirmer :');

    if (finalConfirm === 'SUPPRIMER') {
      localStorage.clear();
      sessionStorage.clear();
      alert('Votre compte a été supprimé avec succès. Au revoir !');
      this.router.navigate(['/']);
    } else if (finalConfirm !== null) {
      this.showError('Confirmation incorrecte');
    }

    this.closeDeleteModal();
  }

  // ========== FERMETURE DES MODALS ==========
  closeModal(modalName: string): void {
    switch(modalName) {
      case 'editProfile':
        this.showEditProfileModal = false;
        break;
      case 'orders':
        this.showOrdersModal = false;
        break;
      case 'addresses':
        this.showAddressesModal = false;
        break;
      case 'payment':
        this.showPaymentMethodsModal = false;
        break;
      case 'password':
        this.showPasswordModal = false;
        break;
      case 'language':
        this.showLanguageModal = false;
        break;
      case 'addAddress':
        this.showAddAddressModal = false;
        break;
      case 'addPayment':
        this.showAddPaymentModal = false;
        break;
    }
  }

  // ========== NOTIFICATIONS ==========
  showSuccess(message: string): void {
    // Vous pouvez utiliser un service de toast/notification ici
    alert(message);
  }

  showError(message: string): void {
    alert('❌ ' + message);
  }
}
