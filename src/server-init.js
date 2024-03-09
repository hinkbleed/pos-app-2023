import { createApp } from './app.js';

import { ProvidorModel } from './models/system/providors/providors.js';
import { EditorialModel } from './models/info/editorials/editorials.js';
import { PasswordModel } from './models/login/login.js';
import { PartyModel } from './models/system/parties/parties.js';
import { GenreModel } from './models/info/genres/genres.js';
import { SubgenreModel } from './models/info/subgenres/subgenres.js';
import { ProductModel } from './models/storage/products/products.js';

createApp({ productModel: ProductModel, providorModel: ProvidorModel, editorialModel: EditorialModel, passwordModel: PasswordModel, partyModel: PartyModel, genreModel: GenreModel, subgenreModel: SubgenreModel });
