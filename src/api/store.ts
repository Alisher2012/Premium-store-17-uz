import type { Product, Order } from '../types';

const PRODUCTS_KEY = 'premium17_products';
const ORDERS_KEY = 'premium17_orders';
const VENDOR_KEY = 'premium17_vendor';

function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return [];
}

function saveProducts(products: Product[]): void {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return [];
}

function saveOrders(orders: Order[]): void {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export const storeApi = {
  products: {
    getAll: (): Product[] => loadProducts(),
    getById: (id: string): Product | undefined =>
      loadProducts().find((p) => p.id === id),
    add: (product: Omit<Product, 'id' | 'createdAt'>): Product => {
      const list = loadProducts();
      const newProduct: Product = {
        ...product,
        id: String(Date.now()),
        createdAt: new Date().toISOString(),
      };
      list.push(newProduct);
      saveProducts(list);
      return newProduct;
    },
    update: (id: string, data: Partial<Product>): Product | null => {
      const list = loadProducts();
      const i = list.findIndex((p) => p.id === id);
      if (i === -1) return null;
      list[i] = { ...list[i], ...data, updatedAt: formatTime(new Date()) };
      saveProducts(list);
      return list[i];
    },
    remove: (id: string): boolean => {
      const list = loadProducts().filter((p) => p.id !== id);
      if (list.length === loadProducts().length) return false;
      saveProducts(list);
      return true;
    },
  },
  orders: {
    getAll: (): Order[] => loadOrders(),
    getById: (id: string): Order | undefined =>
      loadOrders().find((o) => o.id === id),
    create: (order: Omit<Order, 'id' | 'createdAt'>): Order => {
      const list = loadOrders();
      const newOrder: Order = {
        ...order,
        id: 'ORD-' + Date.now(),
        createdAt: new Date().toISOString(),
      };
      list.unshift(newOrder);
      saveOrders(list);
      return newOrder;
    },
    updateStatus: (id: string, status: Order['status']): Order | null => {
      const list = loadOrders();
      const i = list.findIndex((o) => o.id === id);
      if (i === -1) return null;
      list[i].status = status;
      list[i].updatedAt = new Date().toISOString();
      saveOrders(list);
      return list[i];
    },
  },
  vendor: {
    login: (login: string, password: string): boolean => {
      if (login === 'admin' && password === 'premium17') {
        const session = { id: '1', login: 'admin', name: 'Администратор' };
        localStorage.setItem(VENDOR_KEY, JSON.stringify(session));
        return true;
      }
      return false;
    },
    logout: (): void => localStorage.removeItem(VENDOR_KEY),
    getSession: (): { id: string; login: string; name: string } | null => {
      const raw = localStorage.getItem(VENDOR_KEY);
      if (!raw) return null;
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    },
  },
};

function formatTime(d: Date): string {
  return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}
