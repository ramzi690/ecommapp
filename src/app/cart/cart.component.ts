import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  standalone:false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: any[] = [];
    isCartOpen = false; // Tracks if the cart modal is open

  cartTotal = 0;

  constructor(private cartService: CartService,  private dialogRef: MatDialogRef<CartComponent>,
  ) {}

  ngOnInit() {
    this.cartService.cartItems.subscribe(items => {
      this.cart = items;
      this.cartTotal = this.cartService.getTotal();
    });
  }

  updateQuantity(item: any) {
    this.cartService.updateQuantity(item.id, item.quantity);
  }

  removeFromCart(productId: number) {
    this.cartService.removeItem(productId);
  }

  openCart() {
    this.isCartOpen = true; // Open the modal
  }

  closeCart() {
    this.isCartOpen = false; // Close the modal
  }
  incrementQuantity(item: any) {
    item.quantity++;
    this.updateQuantity(item);
  }
  
  decrementQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateQuantity(item);
    }
  }
  
  close() {
    this.dialogRef.close();
  }
}
