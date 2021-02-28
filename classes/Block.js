const SHA256 = require('crypto-js/sha256')

// Elliptic library to sign-off transactions
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

class Block {
	constructor(timestamp, transactions, previousHash = '') {
		this.timestamp = timestamp
		this.transactions = transactions
		this.previousHash = previousHash
		this.hash = this.calculateHash()
		this.nonce = 0
	}

	calculateHash() {
		const data =
			this.previousHash +
			this.timestamp +
			JSON.stringify(this.transactions) +
			this.nonce
		return SHA256(data).toString()
	}

	mineBlock(difficulty) {
		while (
			this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
		) {
			this.nonce += 1
			this.hash = this.calculateHash()
		}
		console.log('Block mined', this.hash)
	}

	hasValidTransactions() {
		for (const tx of this.transactions) {
			if (!tx.isValid()) return false
		}
		return true
	}
}

module.exports = Block
