import SchemaBuilder from '@pothos/core';
import { v7 as uuidv7 } from 'uuid';
import { User, Product, getProductById, searchProducts } from './data';

export const builder = new SchemaBuilder<{
  Objects: { Product: Product };
}>({});

builder.objectType(User, {
  name: 'User',
  fields: t => ({
    id: t.exposeID('id'),
    firstName: t.exposeString('firstName'),
    lastName: t.exposeString('lastName'),
    fullName: t.string({
      resolve: user => `${user.firstName} ${user.lastName}`,
    }),
  }),
});

const ProductRef = builder.objectRef<Product>('Product');
ProductRef.implement({
  fields: t => ({
    id: t.exposeID('id'),
    name: t.exposeString('name'),
    description: t.exposeString('description'),
    price: t.exposeFloat('price'),
    category: t.exposeString('category'),
    imageUrl: t.exposeString('imageUrl'),
    stock: t.exposeInt('stock'),
    createdAt: t.exposeString('createdAt'),
  }),
});

export interface CartItemInputType {
  productId: string;
  quantity: number;
}

const CartItemInput = builder.inputType('CartItemInput', {
  fields: (t) => ({
    productId: t.string({ required: true }),
    quantity: t.int({ required: true }),
  }),
});

export interface CartItemDetail {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  imageUrl?: string | null;
}

const CartItemDetailRef = builder.objectRef<CartItemDetail>('CartItemDetail');
CartItemDetailRef.implement({
  fields: (t) => ({
    productId: t.exposeString('productId'),
    name: t.exposeString('name'),
    price: t.exposeFloat('price'),
    quantity: t.exposeInt('quantity'),
    total: t.exposeFloat('total'),
    imageUrl: t.exposeString('imageUrl', { nullable: true }),
  }),
});

export interface CartDetails {
  items: CartItemDetail[];
  subtotal: number;
  tax: number;
  shipping: number;
  grandTotal: number;
}

const CartDetailsRef = builder.objectRef<CartDetails>('CartDetails');
CartDetailsRef.implement({
  fields: (t) => ({
    items: t.expose('items', { type: [CartItemDetailRef] }),
    subtotal: t.exposeFloat('subtotal'),
    tax: t.exposeFloat('tax'),
    shipping: t.exposeFloat('shipping'),
    grandTotal: t.exposeFloat('grandTotal'),
  }),
});

export interface Order {
  id: string;
  items: CartItemDetail[];
  subtotal: number;
  tax: number;
  shipping: number;
  grandTotal: number;
}

const OrderRef = builder.objectRef<Order>('Order');
OrderRef.implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    items: t.expose('items', { type: [CartItemDetailRef] }),
    subtotal: t.exposeFloat('subtotal'),
    tax: t.exposeFloat('tax'),
    shipping: t.exposeFloat('shipping'),
    grandTotal: t.exposeFloat('grandTotal'),
  }),
});

export function computeCartTotals(items: CartItemInputType[]): CartDetails {
  const itemDetails: CartItemDetail[] = [];
  let subtotal = 0;

  for (const item of items) {
    const product = getProductById(item.productId);
    if (product) {
      const total = product.price * item.quantity;
      itemDetails.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        total,
        imageUrl: product.imageUrl,
      });
      subtotal += total;
    }
  }

  const taxRate = parseFloat(process.env.TAX_RATE || '0.21');
  const shippingCostPerItem = parseFloat(process.env.SHIPPING_COST_PER_ITEM || '4.95');
  const freeShippingThreshold = parseInt(process.env.FREE_SHIPPING_THRESHOLD || '5', 10);

  const tax = subtotal * taxRate;
  let shipping = 0;
  for (const item of items) {
    shipping += item.quantity > freeShippingThreshold ? 0 : shippingCostPerItem;
  }

  const grandTotal = subtotal + shipping;

  return {
    items: itemDetails,
    subtotal,
    tax,
    shipping,
    grandTotal,
  };
}

builder.queryType({
  fields: t => ({
    user: t.field({
      type: User,
      nullable: true,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: (_root, args) => new User(args.id),
    }),

    product: t.field({
      type: ProductRef,
      nullable: true,
      args: {
        id: t.arg.id({ required: true }),
      },
      resolve: async (_root, args) => {
        await new Promise(r => setTimeout(r, 800));
        console.log('product resolver called with id:', args.id);
        return getProductById(args.id) ?? null;
      },
    }),

    searchProducts: t.field({
      type: [ProductRef],
      args: {
        query: t.arg.string({ required: true }),
      },
      resolve: (_root, args) => {
        console.log('searchProducts resolver called with:', args);
        return searchProducts(args.query);
      },
    }),

    products: t.field({
      type: [ProductRef],
      args: {
        ids: t.arg.idList({ required: true }),
      },
      resolve: async (_root, args) => {
        const results: Product[] = [];
        for (const id of args.ids) {
          await new Promise(r => setTimeout(r, 800));
          const product = getProductById(id);
          if (product) results.push(product);
        }
        return results;
      },
    }),

    cartDetails: t.field({
      type: CartDetailsRef,
      args: {
        items: t.arg({
          type: [CartItemInput],
          required: true,
        }),
      },
      resolve: (_root, args) => {
        return computeCartTotals(args.items);
      },
    }),
  }),
});

builder.mutationType({
  fields: t => ({
    createOrder: t.field({
      type: OrderRef,
      args: {
        items: t.arg({
          type: [CartItemInput],
          required: true,
        }),
      },
      resolve: (_root, args) => {
        const totals = computeCartTotals(args.items);
        const id = uuidv7();

        console.log('Created order:', { id, ...totals });

        return {
          id,
          items: totals.items,
          subtotal: totals.subtotal,
          tax: totals.tax,
          shipping: totals.shipping,
          grandTotal: totals.grandTotal,
        };
      },
    }),
  }),
});

export const schema = builder.toSchema();
