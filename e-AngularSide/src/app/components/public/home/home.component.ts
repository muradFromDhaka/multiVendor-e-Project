import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments';
import { BrandResponse } from 'src/app/models/brand.model';
import { CategoryResponse } from 'src/app/models/category.model';
import { ProductResponse } from 'src/app/models/product.model';
import { BrandService } from 'src/app/services/brand.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
 
    categories: CategoryResponse[] = [];
   products: ProductResponse[] = [];
   mostPopularProducts: ProductResponse[] = [];
    topBrands: BrandResponse[] = [];
     
    baseImageUrl = environment.baseImageUrl;
  
     currentIndex = 0;
    intervalId!: any;
    
    isLoggedIn = false;
    searchQuery = '';
  
  constructor(
    private categoryService:CategoryService,
    private productService:ProductService,
    private brandService:BrandService,
    private cartService:CartService
  ){}
  
  
     ngOnInit(): void {
      this.loadPorducts();
      this.loadCategory();
      this.startAutoSlide();
      this.loadBrand();
    }
  
    loadPorducts(){
      this.productService.getAllProducts().subscribe((res) => this.products = res)
      this.productService.getMostPopular().subscribe((res) => this.mostPopularProducts = res)
    }
  
    loadCategory(){
      this.categoryService.getAllCategories().subscribe((res) => this.categories = res)
    }
  
    loadBrand(){
      this.brandService.getAll().subscribe((res) => this.topBrands = res)
    }
  
  
  getCategoryEmoji(categoryName: string): string {
    switch(categoryName.toLowerCase()) {
      case 'electronics': return '💻';
      case 'fashion': return '👗';
      case 'mobile': return '📱';
      case 'grocery': return '🛒';
      case 'beauty': return '💄';
      case 'books': return '📚';
      case 'sports': return '🏀';
      default: return '💻'; // default folder emoji
    }
  }
  
  
  
  
  
  
  
  
  
  
  
  
    ngOnDestroy(): void {
      clearInterval(this.intervalId);
    }
  
    startAutoSlide() {
      this.intervalId = setInterval(() => {
        this.nextSlide();
      }, 3000);
    }
  
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.categories.length;
    }
  
    goToSlide(index: number) {
      this.currentIndex = index;
    }
  
    onSearch() {
      console.log('Searching for:', this.searchQuery);
    }
  
        addToCart(product: any): void {
    this.cartService.addItemToCart({
      productId: product.id,
      quantity: 1
    });
  }

    quickView(product: any) {
      console.log('Quick view:', product);
    }





}
