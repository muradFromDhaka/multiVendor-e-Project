import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorResponse } from 'src/app/models/vendor.model';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
})
export class VendorListComponent implements OnInit {
  vendors: VendorResponse[] = [];

  constructor(private vendorService: VendorService, private router: Router) {}

  ngOnInit(): void {
    this.loadVendors();
  }

  loadVendors(): void {
    this.vendorService.getAllVendors().subscribe({
      next: (data) => (this.vendors = data),
      error: (err) => console.error(err),
    });
  }

  viewVendor(id: number): void {
    this.router.navigate(['/vendors', id]);
  }

  deleteVendor(id: number): void {
    if (confirm('Are you sure you want to delete this vendor?')) {
      this.vendorService.deleteVendor(id).subscribe({
        next: () => this.loadVendors(),
        error: (err) => console.error(err),
      });
    }
  }
}
