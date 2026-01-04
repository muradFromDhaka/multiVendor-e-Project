import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductResponse } from 'src/app/models/product.model';
import { VendorResponse } from 'src/app/models/vendor.model';
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
  // {
  //   shopName: 'Ziaul Shop',
  //   phone: '+8801234567890',
  //   businessEmail: 'shop@example.com',
  //   address: 'Dhaka, Bangladesh',
  //   description: 'Best shop in town',
  //   logoUrl: 'https://via.placeholder.com/100',
  //   bannerUrl: 'https://via.placeholder.com/400x150'
  // };

  orders = [
    { id: '#1021', customer: 'John Doe', date: '2026-01-02', status: 'Pending', total: 120 },
    { id: '#1020', customer: 'Jane Smith', date: '2026-01-01', status: 'Delivered', total: 250 },
    { id: '#1019', customer: 'Mark Lee', date: '2025-12-30', status: 'Cancelled', total: 80 }
  ];

  products=[
    { name: 'Product A', price: 50, stock: 20, status: 'Active' },
    { name: 'Product B', price: 120, stock: 10, status: 'Inactive' }
  ];

  productForm = { name: '', price: 0, stock: 0, status: 'Active' };

  constructor(
    private router: Router,
    private vendorServie: VendorService,
  ){}
  ngOnInit(): void {
    this.vendorServie.getMyVendor().subscribe((res) => this.vendor = res)
  }

  selectTab(tab: string) {
    this.activeTab = tab;
    // this.router.navigate(['/vendor/vendorProfile'])
  }

  openModal() {
    this.modalOpen = true;
    this.editingProduct = null;
    this.productForm = { name: '', price: 0, stock: 0, status: 'Active' };
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
      this.products.push({ ...this.productForm });
    }
    this.closeModal();
  }

  deleteProduct(product: any) {
    this.products = this.products.filter(p => p !== product);
  }

}
