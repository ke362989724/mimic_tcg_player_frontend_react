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
  sellerId: string;
  cardCategory: CardCategory;
  cardCondition: CardCondition;
  seller: Seller;
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

export interface Seller {
  countryId: string;
  nickname: string;
  country: Country;
}

export interface Country {
  name: string;
  currency: Currency;
}

export interface Currency {
  name: string;
  currencyCode: string;
  symbol: string;
}
