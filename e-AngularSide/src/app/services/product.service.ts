import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductRequest, ProductResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  /** CREATE PRODUCT */
  createProduct(dto: ProductRequest, images?: File[]): Observable<ProductResponse> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

    if (images) {
      for (const file of images) {
        formData.append('images', file);
      }
    }

    return this.http.post<ProductResponse>(this.baseUrl, formData);
  }

  /** UPDATE PRODUCT */
  updateProduct(id: number, dto: ProductRequest, images?: File[]): Observable<ProductResponse> {
    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

    if (images) {
      for (const file of images) {
        formData.append('images', file);
      }
    }

    return this.http.put<ProductResponse>(`${this.baseUrl}/${id}`, formData);
  }

  /** LIST ALL PRODUCTS */
  getAllProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(this.baseUrl);
  }


  /** GET PRODUCT BY ID */
  getProductById(id: number): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.baseUrl}/${id}`);
  }


  getProductsByCategoryId(categoryId: number) {
  return this.http.get<any[]>(`${this.baseUrl}/category/${categoryId}`);
}



searchProducts(keyword: string) {
  return this.http.get<ProductResponse[]>(`${this.baseUrl}/search`,{ params: { keyword } });
}



getProductsByBrand(brandId: number): Observable<ProductResponse[]> {
  return this.http.get<ProductResponse[]>(`${this.baseUrl}/brand/${brandId}`);
}


getProductsByVendor(): Observable<ProductResponse[]> {
  return this.http.get<ProductResponse[]>(`${this.baseUrl}/my/product`);
}



  /** DELETE PRODUCT */
  deleteProduct(id: number): Observable<string> {
  return this.http.delete(`${this.baseUrl}/${id}`, {
    responseType: 'text'
  });
}



  /** POPULAR / LATEST / DISCOUNTED / TRENDING */
  getMostPopular(limit = 10): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`${this.baseUrl}/most-popular?limit=${limit}`);
  }

  getLatest(limit = 10): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`${this.baseUrl}/latest?limit=${limit}`);
  }

  getDiscounted(limit = 10): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`${this.baseUrl}/discounted?limit=${limit}`);
  }

  getTrending(limit = 10): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>(`${this.baseUrl}/trending?limit=${limit}`);
  }

}
