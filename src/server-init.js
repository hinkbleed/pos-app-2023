import { createApp } from './app.js';

import { ProvidorModel } from './models/providors.js';

import { ProductModel } from './models/products.js';

createApp({ productModel: ProductModel, providorModel: ProvidorModel });
