export interface VendorRequest {
  shopName: string;
  phone: string;
  address: string;
  businessEmail: string;
  description?: string;
  logoUrl?: string;
  bannerUrl: string;
}

export interface VendorResponse {
  id: number;
  shopName: string;
  slug: string;
  phone: string;
  address: string;
  status: string;
  rating: number;
  userName: string;
  businessEmail: string;
  description?: string;
  logoUrl?: string;
  bannerUrl?: string;
}
