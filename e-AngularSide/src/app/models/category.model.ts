
export interface CategoryRequest {
  name: string;
  imageUrl?: File | undefined;      
  parentId?: number | null; 
}

export interface CategoryResponse {
  id: number;
  name: string;
  imageUrl?: string;
  parentId?: number | null;
  parentName?: string;
  subCategories?: CategoryResponse[];
}

// category.model.ts
// export interface CategoryRequest {
//   id?: number;
//   name: string;
//   parentId?: number | null;
//   image?: File | null;
// }

// export interface CategoryResponse {
//   id: number;
//   name: string;
//   imageUrl?: string;
//   parentId?: number | null;
//   subCategories?: CategoryResponse[];
// }


