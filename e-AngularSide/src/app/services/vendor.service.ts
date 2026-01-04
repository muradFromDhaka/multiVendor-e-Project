import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VendorRequest, VendorResponse } from '../models/vendor.model';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  private baseUrl = 'http://localhost:8080/api/vendors';

  constructor(private http: HttpClient) {}

  // Create Vendor
  createVendor(dto: VendorRequest): Observable<VendorResponse> {
    return this.http.post<VendorResponse>(this.baseUrl, dto);
  }

  // Get all vendors (Admin)
  getAllVendors(): Observable<VendorResponse[]> {
    return this.http.get<VendorResponse[]>(this.baseUrl);
  }

  // Get vendor by ID
  getVendorById(id: number): Observable<VendorResponse> {
    return this.http.get<VendorResponse>(`${this.baseUrl}/${id}`);
  }

  // Update vendor
  updateVendor(id: number, dto: VendorRequest): Observable<VendorResponse> {
    return this.http.put<VendorResponse>(`${this.baseUrl}/${id}`, dto);
  }

  // Delete vendor
  deleteVendor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Get logged-in user's vendor
  getMyVendor(): Observable<VendorResponse> {
    return this.http.get<VendorResponse>(`${this.baseUrl}/me`);
  }
}
