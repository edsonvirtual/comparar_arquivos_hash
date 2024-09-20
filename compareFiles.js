const fs = require('fs');
const crypto = require('crypto');

function calculateHash(filePath, algorithm = 'sha256') {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash(algorithm);
        const stream = fs.createReadStream(filePath);

        stream.on('data', chunk => hash.update(chunk));
        stream.on('end', () => resolve(hash.digest('hex')));
        stream.on('error', err => reject(err));
    });
}

async function compareFiles(file1, file2) {
    try {
        const hash1 = await calculateHash(file1);
        const hash2 = await calculateHash(file2);

        if (hash1 === hash2) {
            console.log('Os arquivos são iguais.');
        } else {
            console.log('Os arquivos são diferentes.');
        }
    } catch (error) {
        console.error('Erro ao calcular hashes:', error);
    }
}

// Substitua 'file1.txt' e 'file2.txt' pelos caminhos dos seus arquivos
const file1 = 'file1.txt';
const file2 = 'file2.txt';

compareFiles(file1, file2);