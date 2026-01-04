import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments';
import { Observable } from 'rxjs';
import { OrderResponse } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  checkout(paymentMethod: string): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${this.apiUrl}/checkout?paymentMethod=${paymentMethod}`, {});
  }

  getUserOrders(): Observable<OrderResponse[]> {
    return this.http.get<OrderResponse[]>(this.apiUrl);
  }

  getOrder(orderId: number): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/${orderId}`);
  }
}
