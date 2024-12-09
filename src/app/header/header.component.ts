import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CartComponent } from '../cart/cart.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  cartItemCount = 0;

  constructor(private cartService: CartService,private matDialog: MatDialog) {
    this.cartService.cartItemCount.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  openCart() {
    this.matDialog.open(CartComponent, {
      width: '600px', // Adjust the width as needed
      disableClose: false, // Allows the dialog to be closed
    });
  }  }

