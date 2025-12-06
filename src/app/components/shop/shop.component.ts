import { Component } from '@angular/core';

interface Product {
  title: string;
  price: number;
  imgSrc: string;
}

interface CartItem extends Product {
  qty: number;
}

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {

  isCartOpen = false;
  cart: CartItem[] = [];


  previewOpen = false;
  previewSrc: string | null = null;
  previewTitle: string | null = null;
  previewDesc: string | null = null;
  previewPrice: number | null = null;

  // ========== CART METHODS ==========

  /**
   * Ouvre le panier latéral
   */
  openCart(): void {
    this.isCartOpen = true;
  }

  /**
   * Ferme le panier latéral
   */
  closeCart(): void {
    this.isCartOpen = false;
  }

  /**
   * Ajoute un produit au panier
   * @param product Le produit à ajouter
   */
  addToCart(product: Product): void {
    const existing = this.cart.find(i => i.title === product.title);
    if (existing) {
      alert("Cet article existe déjà dans votre panier !");
      return;
    }
    this.cart.push({...product, qty: 1});
  }

  /**
   * Retire un produit du panier
   * @param index L'index du produit dans le panier
   */
  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
  }

  /**
   * Met à jour la quantité d'un produit
   * @param index L'index du produit dans le panier
   * @param qty La nouvelle quantité
   */
  setQuantity(index: number, qty: number | string): void {
    let n = typeof qty === 'string' ? parseInt(qty, 10) : qty;
    if (!Number.isFinite(n) || n < 1) n = 1;
    this.cart[index].qty = Math.floor(n);
  }

  /**
   * Passe la commande
   */
  buyOrder(): void {
    if (this.cart.length === 0) {
      alert("Il n'y a aucune commande à passer.\nVeuillez ajouter des articles.");
      return;
    }
    alert("Votre commande a été passée avec succès !");
    this.clearCart();
  }

  /**
   * Vide le panier
   */
  clearCart(): void {
    this.cart = [];
  }

  /**
   * Calcule le total du panier
   * @returns Le montant total
   */
  get total(): number {
    return this.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  }

  /**
   * Fonction de tracking pour ngFor (optimisation)
   */
  trackByTitle = (_index: number, item: CartItem) => item.title;

  // ========== PREVIEW METHODS ==========

  /**
   * Ouvre la popup d'aperçu du produit
   * @param item Les détails du produit
   */
  openPreview(item: { imgSrc: string; title: string; price: number; desc?: string }): void {
    this.previewSrc = item.imgSrc;
    this.previewTitle = item.title;
    this.previewPrice = item.price;
    this.previewDesc = item.desc ?? '';
    this.previewOpen = true;
  }

  /**
   * Ferme la popup d'aperçu
   */
  closePreview(): void {
    this.previewOpen = false;
    this.previewSrc = null;
    this.previewTitle = null;
    this.previewDesc = null;
    this.previewPrice = null;
  }

  /**
   * Ajoute le produit de l'aperçu au panier
   */
  addPreviewToCart(): void {
    if (!this.previewSrc || !this.previewTitle || this.previewPrice == null) {
      return;
    }

    this.addToCart({
      title: this.previewTitle,
      price: this.previewPrice,
      imgSrc: this.previewSrc,
    });

    this.closePreview();
  }
}
