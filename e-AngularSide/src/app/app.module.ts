import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PublicProductViewComponent } from './components/public/public-product-view/public-product-view.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminProductlistComponent } from './components/admin/admin-productlist/admin-productlist.component';
import { AdminProductDetailsComponent } from './components/admin/admin-product-details/admin-product-details.component';
import { AdminProductformComponent } from './components/admin/admin-productform/admin-productform.component';
import { AdminCategorylistComponent } from './components/admin/admin-categorylist/admin-categorylist.component';
import { AdminCategoryformComponent } from './components/admin/admin-categoryform/admin-categoryform.component';
import { BrandListComponent } from './components/admin/brand-list/brand-list.component';
import { BrandFormComponent } from './components/admin/brand-form/brand-form.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { VendorFormComponent } from './components/vendors/vendor-form/vendor-form.component';
import { VendorProfileComponent } from './components/vendors/vendor-profile/vendor-profile.component';
import { VendorListComponent } from './components/vendors/vendor-list/vendor-list.component';
import { VendorDetailsComponent } from './components/vendors/vendor-details/vendor-details.component';
import { VendorLayoutComponent } from './components/vendors/vendor-layout/vendor-layout.component';
import { VendorDashboardComponent } from './components/vendors/vendor-dashboard/vendor-dashboard.component';
import { HomeComponent } from './components/public/home/home.component';
import { CategoryProductsComponent } from './components/public/category-products/category-products.component';
import { BrandProductsComponent } from './components/public/brand-products/brand-products.component';
import { CartComponent } from './components/public/cart/cart.component';
import { OrderListComponent } from './components/public/order-list/order-list.component';
import { OrderDetailsComponent } from './components/public/order-details/order-details.component';
import { TestComponent } from './components/public/test/test.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PublicProductViewComponent,
    AdminDashboardComponent,
    AdminLayoutComponent,
    AdminProductlistComponent,
    AdminProductDetailsComponent,
    AdminProductformComponent,
    AdminCategorylistComponent,
    AdminCategoryformComponent,
    BrandListComponent,
    BrandFormComponent,
    NavbarComponent,
    RegisterComponent,
    VendorFormComponent,
    VendorProfileComponent,
    VendorListComponent,
    VendorDetailsComponent,
    VendorLayoutComponent,
    VendorDashboardComponent,
    HomeComponent,
    CategoryProductsComponent,
    BrandProductsComponent,
    CartComponent,
    OrderListComponent,
    OrderDetailsComponent,
    TestComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
