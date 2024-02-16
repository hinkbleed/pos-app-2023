import { randomUUID } from 'node:crypto';
import { readJSON } from '../../utils/utils.js';
const products = readJSON('../db/productos.json');

export class ProductModel {
  static async getAll ({ genre }) {
    if (genre) {
      return products.filter(
        product => product.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      );
    }
    return products;
  }

  static async getById ({ id, catProducts }) {
    try {
      const product = products.find(product => product.id === id); return product;
    } catch {
      throw new Error('Product not found');
    }
  }

  static async create ({ input }) {
    const newProduct = {
      id: randomUUID(),
      ...input
    };
    products.push(newProduct);
    return newProduct;
  }

  static async delete ({ id }) {
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) return false;

    products.splice(productIndex, 1);
    return true;
  }

  static async update ({ id, input }) {
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) return false;

    products[productIndex] = {
      ...products[productIndex],
      ...input
    };
    return products[productIndex];
  }
}
