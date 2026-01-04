export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  DISCONTINUED = 'DISCONTINUED',
  DRAFT = 'DRAFT'
}

export interface ProductRequest {
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  sku: string;
  categoryId: number;
  brandId: number;
  vendorId?: number; // admin only
  status?: ProductStatus;
  releaseDate?: string; // ISO date string: yyyy-MM-dd
  imageUrls?: string[]; // optional
}

export interface ProductResponse {
  id: number;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  stockQuantity: number;
  status?: ProductStatus;
  releaseDate?: string; // ISO date string
  sku: string;
  averageRating?: number;
  totalReviews?: number;
  imageUrls?: string[];

  // Flattened relationships
  categoryId: number;
  categoryName?: string;

  brandId: number;
  brandName?: string;

  vendorId?: number;
  vendorName?: string;

  // BaseEntity info
  deleted?: boolean;
  createdAt?: string; // ISO datetime string
  updatedAt?: string; // ISO datetime string

  // Backend managed field
  soldCount?: number;
}


