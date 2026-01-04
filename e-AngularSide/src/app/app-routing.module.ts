import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicProductViewComponent } from './components/public/public-product-view/public-product-view.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './components/admin/admin-layout/admin-layout.component';
import { AdminProductlistComponent } from './components/admin/admin-productlist/admin-productlist.component';
import { AdminProductformComponent } from './components/admin/admin-productform/admin-productform.component';
import { AdminCategorylistComponent } from './components/admin/admin-categorylist/admin-categorylist.component';
import { AdminCategoryformComponent } from './components/admin/admin-categoryform/admin-categoryform.component';
import { AdminProductDetailsComponent } from './components/admin/admin-product-details/admin-product-details.component';
import { BrandListComponent } from './components/admin/brand-list/brand-list.component';
import { BrandFormComponent } from './components/admin/brand-form/brand-form.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { VendorLayoutComponent } from './components/vendors/vendor-layout/vendor-layout.component';
import { VendorDashboardComponent } from './components/vendors/vendor-dashboard/vendor-dashboard.component';
import { VendorListComponent } from './components/vendors/vendor-list/vendor-list.component';
import { VendorFormComponent } from './components/vendors/vendor-form/vendor-form.component';
import { VendorDetailsComponent } from './components/vendors/vendor-details/vendor-details.component';
import { VendorProfileComponent } from './components/vendors/vendor-profile/vendor-profile.component';
import { HomeComponent } from './components/public/home/home.component';
import { CategoryProductsComponent } from './components/public/category-products/category-products.component';
import { BrandProductsComponent } from './components/public/brand-products/brand-products.component';
import { CartComponent } from './components/public/cart/cart.component';
import { OrderListComponent } from './components/public/order-list/order-list.component';
import { OrderDetailsComponent } from './components/public/order-details/order-details.component';
import { TestComponent } from './components/public/test/test.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  // { path: 'test', component: TestComponent },
  { path: 'categoryProduct/:id/:name', component: CategoryProductsComponent },
  { path: 'categoryProduct', component: CategoryProductsComponent },
  { path: 'view/:id', component: PublicProductViewComponent },

  { path: 'brand/:id', component: BrandProductsComponent },

  { path: 'cart', component: CartComponent },

  { path: 'orderList', component: OrderListComponent },
  { path: 'orderView/:id', component: OrderDetailsComponent },






  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'adminLayout',
    component: AdminLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'adminDashboard' },
      { path: 'adminDashboard', component: AdminDashboardComponent },
      { path: 'adminProductList', component: AdminProductlistComponent },
      { path: 'adminProductForm', component: AdminProductformComponent },
       { path: 'adminEditProductForm/:id', component: AdminProductformComponent },
      { path: 'adminProductView/:id', component: AdminProductDetailsComponent },
      { path: 'adminCategoryList', component: AdminCategorylistComponent },
      { path: 'adminCategoryForm', component: AdminCategoryformComponent },
      { path: 'adminEditCategoryForm/:id', component: AdminCategoryformComponent },
      { path: 'brand', component: BrandListComponent },
      { path: 'brandForm', component: BrandFormComponent },
      { path: 'editBrand/:id', component: BrandFormComponent }
    ],
  },


  {
    path: 'vendor',
    component: VendorLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'vendorDashboard' },
      { path: 'vendorDashboard', component: VendorDashboardComponent },
      { path: 'vendorProfile', component: VendorProfileComponent },
      { path: 'vendorList', component: VendorListComponent },
      { path: 'vendorForm', component: VendorFormComponent },
      { path: 'vendorEditForm/:id', component: VendorFormComponent},
      { path: 'vendorDetails', component: VendorDetailsComponent },

      // { path: 'adminCategoryForm', component: AdminCategoryformComponent },
      // { path: 'brand', component: BrandListComponent },
      // { path: 'brandForm', component: BrandFormComponent },
      // { path: 'editBrand/:id', component: BrandFormComponent }
    ],
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
