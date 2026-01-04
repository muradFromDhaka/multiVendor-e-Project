import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ProductRequest,
  ProductResponse,
  ProductStatus,
} from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { AuthService } from 'src/app/services/auth.service';
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { VendorService } from 'src/app/services/vendor.service';
import { BrandResponse } from 'src/app/models/brand.model';
import { CategoryResponse } from 'src/app/models/category.model';
import { VendorResponse } from 'src/app/models/vendor.model';
import { finalize } from 'rxjs';
import { environment } from 'src/app/environments';

@Component({
  selector: 'app-admin-productform',
  templateUrl: './admin-productform.component.html',
  styleUrls: ['./admin-productform.component.scss'],
})
export class AdminProductformComponent implements OnInit {
  productForm!: FormGroup;
  isEditMode = false;
  productId?: number;

  brands: BrandResponse[] = [];
  categories: CategoryResponse[] = [];
  vendors: VendorResponse[] = [];

  existingImages: string[] = [];
  newImages: File[] = [];
  previewImages: string[] = [];

  productStatuses = Object.values(ProductStatus);

  loading = false;
  isAdmin = false;
  baseImageUrl = environment.baseImageUrl;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private vendorService: VendorService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.authService.hasRole('ROLE_ADMIN');

    this.productId = this.route.snapshot.params['id'];
    this.isEditMode = !!this.productId;

    // Initialize form
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(1000)]],
      price: [0, [Validators.required, Validators.min(0.01)]],
      discountPrice: [0, [Validators.min(0)]],
      stockQuantity: [0, [Validators.required, Validators.min(0)]],
      status: [ProductStatus.DRAFT],
      releaseDate: [''],
      sku: ['', Validators.required],
      categoryId: [null, Validators.required],
      brandId: [null, Validators.required],
      vendorId: [{ value: null, disabled: !this.isAdmin }],
    });

    this.loadBrands();
    this.loadCategories();
    if (this.isAdmin) this.loadVendors();

    if (!this.isAdmin && currentUser?.vendorId) {
      this.productForm.patchValue({ vendorId: currentUser.vendorId });
    }

    if (this.isEditMode && this.productId) {
      this.loadProduct(this.productId);
    }

    if (!this.productId) {
      return;
    } else {
      this.productService
        .getProductById(this.productId)
        .subscribe((product) => {
          this.loadProductForEdit(product);
        });
    }
  }

  private loadBrands() {
    this.brandService.getAll().subscribe((res) => (this.brands = res));
  }

  private loadCategories() {
    this.categoryService
      .getAllCategories()
      .subscribe((res) => (this.categories = res));
  }

  private loadVendors() {
    this.vendorService.getAllVendors().subscribe((res) => (this.vendors = res));
  }

  private loadProduct(id: number) {
    this.loading = true;
    this.productService
      .getProductById(id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res: ProductResponse) => {
          this.productForm.patchValue({
            ...res,
            status: res.status ?? ProductStatus.DRAFT,
            releaseDate: res.releaseDate ?? '',
          });
          if (res.imageUrls) {
            this.existingImages = [...res.imageUrls];
            this.previewImages = [...res.imageUrls];
          }
        },
        error: (err) => console.error(err),
      });
  }

  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const files = Array.from(event.target.files) as File[];
      this.newImages.push(...files);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => this.previewImages.push(e.target.result);
        reader.readAsDataURL(file);
      });
    }
  }


  loadProductForEdit(product: ProductResponse) {
    this.previewImages = (product.imageUrls ?? []).map(
      (img) => this.baseImageUrl + img
    );

   // For preview, combine base URL + existing images
  this.previewImages = this.existingImages.map(img => this.baseImageUrl + img);
  }

  removeImage(index: number) {
  const previewImg = this.previewImages[index];

  // Remove from preview
  this.previewImages.splice(index, 1);

  // Check if it's an existing image
  const existingIndex = this.existingImages.findIndex(
    img => this.baseImageUrl + img === previewImg
  );

  if (existingIndex >= 0) {
    // Remove from existingImages (backend paths)
    this.existingImages.splice(existingIndex, 1);
  } else {
    // Otherwise remove from newImages
    const newIndex = index - this.previewImages.length + this.newImages.length;
    this.newImages.splice(newIndex, 1);
  }
}





  submit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const dto: ProductRequest = {
      ...this.productForm.getRawValue(),
      status: this.productForm.value.status ?? ProductStatus.DRAFT,
      releaseDate: this.productForm.value.releaseDate || null,
      imageUrls: this.existingImages // <-- include existing images
    };

    this.loading = true;

    const request$ =
      this.isEditMode && this.productId
        ? this.productService.updateProduct(this.productId, dto, this.newImages)
        : this.productService.createProduct(dto, this.newImages);

    request$.pipe(finalize(() => (this.loading = false))).subscribe({
      next: () => this.router.navigate(['/adminLayout/adminProductList']),
      error: (err) => {
        console.error(err);
        alert('Error occurred while saving product.');
      },
    });
  }

  // Helper for template
  get f() {
    return this.productForm.controls;
  }

  discountError(): string | null {
    const price = this.productForm.value.price;
    const discount = this.productForm.value.discountPrice;
    return discount > price ? 'Discount cannot be greater than price' : null;
  }
}
