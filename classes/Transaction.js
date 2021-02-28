const SHA256 = require('crypto-js/sha256')

// Elliptic library to sign-off transactions
const EC = require('elliptic').ec
const ec = new EC('secp256k1')

class Transaction {
	constructor(fromAddress, toAddress, amount) {
		this.fromAddress = fromAddress
		this.toAddress = toAddress
		this.amount = amount
	}

	calculateHash() {
		return SHA256(this.fromAddress + this.toAddress + this.amount).toString()
	}

	signTransaction(signingKey) {
		// before we sign the transaction, we can add a check to ensure the right keys are passed in
		if (signingKey.getPublic('hex') !== this.fromAddress) {
			throw new Error('You cannot sign transactions for other wallets')
		}
		const hashTx = this.calculateHash()

		// Sign transaction with the private key
		const sig = signingKey.sign(hashTx, 'base64')
		this.signature = sig.toDER('hex') // signing function to get the signature into a specific format
	}

	isValid() {
		if (this.fromAddress === null) return false

		if (!this.signature || this.signature.length === 0) {
			throw new Error('No signature in this transaction')
		}

		const publicKey = ec.keyFromPublic(this.fromAddress, 'hex')
		return publicKey.verify(this.calculateHash(), this.signature)
	}
}

module.exports = Transaction
