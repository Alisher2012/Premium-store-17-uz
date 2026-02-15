export interface Product {
  id: string;
  title: string;
  slug?: string;
  brand?: string;
  price: number;
  currency: string;
  mainImage: string;
  images: string[];
  cargoNo: boolean;
  deliveryDays: string;
  adminContact?: string;
  adminContact2?: string;
  views?: number;
  reactions?: { heart?: number; fire?: number };
  updatedAt?: string;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedImage?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerComment?: string;
  items: CartItem[];
  total: number;
  status: 'new' | 'accepted' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  updatedAt?: string;
}

export interface VendorSession {
  id: string;
  login: string;
  name: string;
}
