// hash-password.mjs

import bcrypt from 'bcryptjs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Digite a senha para o usuário admin: ', (password) => {
  if (!password) {
    console.error('Senha não pode ser vazia.');
    rl.close();
    return;
  }
  
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  
  console.log('\n--- SENHA CRIPTOGRAFADA (HASH) ---');
  console.log('Copie e cole este valor no campo "Senha (Hash)" do seu usuário no Sanity Studio:');
  console.log('\x1b[32m%s\x1b[0m', hash); // Imprime o hash em verde
  
  rl.close();
});