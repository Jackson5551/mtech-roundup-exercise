const crypto = require('crypto')
const fs = require('fs')

const fileName = '' //Needs to exist first
const algorithm = 'aes-192-cbc'  //is this a specific?
const password = 'abc123'

const key = crypto.scryptSync(password, 'salt', 24)   //24 is the hash amount   and salt is just a random word thrown in there
const iv = Buffer.alloc(16,0) //Creating a secure location
const inFile = fs.createReadStream(fileName)  // makes it possible to read for the encryption
const outFile = fs.createWriteStream(fileName + '.aes') //making it into an aes file

const encrypt = crypto.createCipheriv(algorithm, key, iv)  //takes the algorithm with said key in a secure location


inFile.pipe(encrypt).pipe(outFile)  //pipe in the file for encryption and pipe out the encryption into the outFile

