const Block = require('./classes/Block')
const Blockchain = require('./classes/Blockchain')
const Transaction = require('./classes/Transaction')
const SHA256 = require('crypto-js/sha256')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

// Generate a public and private key pair for wallet 1
const firstKey = ec.genKeyPair()
const firstWalletAddress = firstKey.getPublic('hex')

// Generatea a another public and private key pair for wallet 2
const secondKey = ec.genKeyPair()
const secondWalletAddress = secondKey.getPublic('hex')

// Create a new blockchain
let blockchain = new Blockchain()

// Transfer 10 coins from wallet 1 to wallet 2
// This will generate a pending transaction
const tx1 = new Transaction(firstWalletAddress, secondWalletAddress, 21)
tx1.signTransaction(firstKey)
blockchain.createTransaction(tx1)

// Mine the pending transaction
blockchain.minePendingTransactions(firstWalletAddress)

// Display the balances of wallet 1 and 2
console.log(
	'Balance of the first wallet:',
	blockchain.getBalanceOfAddress(firstWalletAddress)
)
console.log(
	'Balance of the second wallet:',
	blockchain.getBalanceOfAddress(secondWalletAddress)
)
