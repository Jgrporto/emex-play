import category from './category'
import training from './training'
import homepage from './homepage' // 1. Importe o novo schema
import user from './user' // <-- 1. IMPORTE O NOVO SCHEMA

// 2. Adicione 'homepage' na lista
export const schemaTypes = [homepage, category, training, user]