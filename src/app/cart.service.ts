import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = JSON.parse(localStorage.getItem('cart') || '[]');
  private cartItemsSubject = new BehaviorSubject<any[]>(this.cart);
  private cartItemCountSubject = new BehaviorSubject<number>(this.getItemCount());

  // Observables for cart items and item count
  cartItems = this.cartItemsSubject.asObservable();
  cartItemCount = this.cartItemCountSubject.asObservable();

  /**
   * Add an item to the cart. If it already exists, increase the quantity.
   * @param product - The product object to be added.
   */

    private cartOpen = new BehaviorSubject<boolean>(false);
    cartOpenState = this.cartOpen.asObservable();
  
    // Existing cart management code...
  
    openCart() {
      this.cartOpen.next(true);
    }
  
    closeCart() {
      this.cartOpen.next(false);
    }
  addItem(product: any) {
    const existingItem = this.cart.find((item: any) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.saveCart();
    this.updateCartState();
  }

  /**
   * Remove an item from the cart by its ID.
   * @param productId - The ID of the product to be removed.
   */
  removeItem(productId: number) {
    this.cart = this.cart.filter((item: any) => item.id !== productId);
    this.saveCart();
    this.updateCartState();
  }

  /**
   * Update the quantity of a cart item. If quantity is 0 or less, remove the item.
   * @param productId - The ID of the product.
   * @param quantity - The new quantity for the product.
   */
  updateQuantity(productId: number, quantity: number) {
    const item = this.cart.find((item: any) => item.id === productId);

    if (item) {
      item.quantity = quantity;

      if (item.quantity <= 0) {
        this.removeItem(productId);
      } else {
        this.saveCart();
        this.updateCartState();
      }
    }
  }

  /**
   * Clear all items from the cart.
   */
  clearCart() {
    this.cart = [];
    this.saveCart();
    this.updateCartState();
  }

  /**
   * Get the total cost of items in the cart.
   * @returns The total cost.
   */
  getTotal(): number {
    return this.cart.reduce((total:any, item:any) => total + item.price * item.quantity, 0);
  }

  /**
   * Get the total number of items in the cart.
   * @returns The item count.
   */
  private getItemCount(): number {
    return this.cart.reduce((count: number, item: any) => count + item.quantity, 0);
  }

  /**
   * Update the state of cart-related observables.
   */
  private updateCartState() {
    this.cartItemsSubject.next([...this.cart]); // Emit a copy of the cart array
    this.cartItemCountSubject.next(this.getItemCount());
  }

  /**
   * Save the current cart to local storage.
   */
  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
