export interface ProductProps {
  products: Product[];
  totalResult: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  qty: number;
  createdAt: Date;
  cardCategory: CardCategory;
  cardCondition: CardCondition;
  images: Image[];
}

export interface CardCategory {
  name: string;
}

export interface CardCondition {
  name: string;
  description: string;
}

export interface Image {
  id: string;
  imageUrl: string;
  isCoverImage: boolean;
  createdAt: Date;
}
