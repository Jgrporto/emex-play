import category from './category'
import training from './training'
import homepage from './homepage' // 1. Importe o novo schema
import user from './user' // <-- 1. IMPORTE O NOVO SCHEMA
import bannerTreinamento from './bannerTreinamento' // <-- 1. IMPORTE AQUI

// 2. Adicione 'homepage' na lista
export const schemaTypes = [bannerTreinamento, homepage, category, training, user]

