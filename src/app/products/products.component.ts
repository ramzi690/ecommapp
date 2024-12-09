import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products',
  standalone:false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products = [
    { id: 3, name: 'exempleeee', description: 'exempleee', price: 300, image: 'https://thumbs.dreamstime.com/b/estampille-d-exemple-28420393.jpg', category: 'exemple' },

    { id: 1, name: 'Laptop', description: 'High performance laptop', price: 1200, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY-ExfAKU2RS5WaBZ7UMy6ReTWKhZkNq6SoQ&s', category: 'Electronics' },
    { id: 2, name: 'Shirt', description: 'Comfortable cotton shirt ', price: 25, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXSRCee_8p29UE_psZJadZtXkpNL1_5cj8JA&s', category: 'Clothing' },
  ];

  categories = ['All', 'Electronics', 'Clothing','exemple'];
  selectedCategory = 'All';
  filteredProducts = this.products;

  constructor(private cartService: CartService) {}

  ngOnInit() {}

  filterProducts(category: string) {
    this.selectedCategory = category;
    this.filteredProducts = category === 'All' ? this.products : this.products.filter(p => p.category === category);
  }

  addToCart(product: any) {
    this.cartService.addItem(product);
  }
}
