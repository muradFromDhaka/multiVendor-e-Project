import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductResponse } from 'src/app/models/product.model';
import { VendorResponse } from 'src/app/models/vendor.model';
import { ProductService } from 'src/app/services/product.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {

  activeTab: string = 'profile';
  modalOpen: boolean = false;
  editingProduct: any = null;

   vendor!: VendorResponse;

  orders = [
    { id: '#1021', customer: 'John Doe', date: '2026-01-02', status: 'Pending', total: 120 },
    { id: '#1020', customer: 'Jane Smith', date: '2026-01-01', status: 'Delivered', total: 250 },
    { id: '#1019', customer: 'Mark Lee', date: '2025-12-30', status: 'Cancelled', total: 80 }
  ];

  products!: ProductResponse[];


  productForm!: FormGroup; 

  constructor(
    private router: Router,
    private producService: ProductService,
    private vendorServie: VendorService,
  ){}
  ngOnInit(): void {
    this.loadVendor();
    this.loadProducts();
  }

   loadVendor() {
    this.vendorServie.getMyVendor().subscribe((res) => this.vendor = res);
  }

    loadProducts() {
    this.producService.getProductsByVendor()
      .subscribe(res => this.products = res);
  }



  selectTab(tab: string) {
    this.activeTab = tab;
    // this.router.navigate(['/vendor/vendorProfile'])
  }

//   selectTab(tab: string) {
//     this.activeTab = tab;

//     switch(tab) {
//       case 'profile':
//         this.router.navigate(['/vendor/profile']);
//         break;
//       case 'products':
//         this.router.navigate(['/vendor/products']);
//         break;
//       case 'orders':
//         this.router.navigate(['/vendor/orders']);
//         break;
//     }
// }


  openModal() {
    this.modalOpen = true;
    this.editingProduct = null;
  }

  closeModal() {
    this.modalOpen = false;
  }

  editProduct(product: any) {
    this.editingProduct = product;
    this.productForm = { ...product };
    this.modalOpen = true;
  }

  saveProduct() {
    if(this.editingProduct) {
      Object.assign(this.editingProduct, this.productForm);
    } else {
      // this.products.push({ ...this.productForm });
    }
    this.closeModal();
  }

  deleteProduct(product: any) {
    this.products = this.products.filter(p => p !== product);
  }

}
