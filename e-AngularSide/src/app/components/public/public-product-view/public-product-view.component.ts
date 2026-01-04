import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/app/environments';
import { ProductResponse } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-public-product-view',
  templateUrl: './public-product-view.component.html',
  styleUrls: ['./public-product-view.component.scss']
})
export class PublicProductViewComponent {

productId!: string | null;
  product!: ProductResponse;
  loading: boolean = true;
  errorMessage: string = '';
  selectedImageIndex: number = 0;
  baseImageUrl = environment.baseImageUrl;

  defaultImages: string[] = [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500'
  ];

  constructor(
    private productService: ProductService,
    public authService: AuthService,
    private acRouter: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = this.acRouter.snapshot.paramMap.get('id');

    if (this.productId) {
      this.productService.getProductById(+this.productId)
        .subscribe({
          next: (res) => {
            this.product = res;
            this.loading = false;
          },
          error: () => {
            this.errorMessage = 'Failed to load product details.';
            this.loading = false;
          }
        });
    } else {
      this.errorMessage = 'No product ID provided in the URL.';
    }
  }

  get displayedImage(): string {
    if (this.product.imageUrls && this.product.imageUrls.length > 0) {
      const img = this.product.imageUrls[this.selectedImageIndex];
      return img.startsWith('http') ? img : this.baseImageUrl + img;
    } else {
      return this.defaultImages[this.selectedImageIndex];
    }
  }
  

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  formatDate(dateString?: string): string {
    return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
  }

  calculateDiscountPercentage(): number {
    if (this.product?.price && this.product?.discountPrice) {
      return Math.round(((this.product.price - this.product.discountPrice) / this.product.price) * 100);
    }
    return 0;
  }

  goBack(): void {
    this.router.navigate(['categoryProduct', this.product.id,this.product.name]);
  }

    addToCart(product: any): void {
    this.cartService.addItemToCart({
      productId: product.id,
      quantity: 1
    });
  }

}
