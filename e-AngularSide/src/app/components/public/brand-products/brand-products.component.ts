import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductResponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/app/environments';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-brand-products',
  templateUrl: './brand-products.component.html',
  styleUrls: ['./brand-products.component.scss']
})
export class BrandProductsComponent implements OnInit {

  brandId?: number;
  products: ProductResponse[] = [];
  loading = true;
  baseImageUrl = environment.baseImageUrl;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    // private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.brandId = Number(params.get('id'));
        this.loadProductsByBrand();
      }
    });
  }

  loadProductsByBrand(): void {
    if (!this.brandId) return;

    this.loading = true;
    this.productService.getProductsByBrand(this.brandId).subscribe({
      next: res => {
        this.products = res;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
}
