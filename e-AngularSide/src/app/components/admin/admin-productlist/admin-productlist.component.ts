import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductResponse } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-productlist',
  templateUrl: './admin-productlist.component.html',
  styleUrls: ['./admin-productlist.component.scss']
})
export class AdminProductlistComponent {

   products: ProductResponse[] = [];
  loading = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        // alert('Failed to load products');
      }
    });
  }

  editProduct(id: number): void {
    this.router.navigate(['/adminLayout/adminEditProductForm', id]);
  }

  deleteProduct(id: number): void {
    if (!confirm('Are you sure to delete this product?')) return;
    this.productService.deleteProduct(id).subscribe({
      next: () => {
        this.products = this.products.filter(p => p.id !== id);
      //  this.loadProducts()
      },
    });
  }


    addToCart(product: any): void {
    this.cartService.addItemToCart({
      productId: product.id,
      quantity: 1
    });
  }



  



}
