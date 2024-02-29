import { createApp } from './app.js';

import { ProvidorModel } from './models/providors.js';
import { ProductModel } from './models/products.js';
import { EditorialModel } from './models/editorials.js';
import { PasswordModel } from './models/login/login.js';

createApp({ productModel: ProductModel, providorModel: ProvidorModel, editorialModel: EditorialModel, passwordModel: PasswordModel });
