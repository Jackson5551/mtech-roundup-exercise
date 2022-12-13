const crypto = require('crypto')
const fs = require('fs')

const fileName = '';

const algorithm = 'aes-192-cbc';

const password = 'abc123';

// Use the async `crypto.scrypt()` instead.

const key = crypto.scryptSync(password, 'salt', 24);  //has to be the same

// The IV is usually passed along with the ciphertext.

const iv = Buffer.alloc(16, 0); // Initialization vector.

// input file

const inFile = fs.createReadStream(fileName);

// output file

const outFile = fs.createWriteStream(fileName + ".txt");

// decrypt content

const decrypt = crypto.createDecipheriv(algorithm, key, iv);

// start pipe

inFile.pipe(decrypt).pipe(outFile);