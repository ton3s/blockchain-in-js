const Block = require('./Block')
const Transaction = require('./Transaction')

class Blockchain {
	constructor() {
		this.chain = [this.createGenesisBlock()]
		this.difficulty = 3
		this.pendingTransactions = []
		this.miningReward = 100
	}

	createGenesisBlock() {
		return new Block(Date.now(), 'Genesis Block', '0')
	}

	getLatestBlock() {
		return this.chain[this.chain.length - 1]
	}

	addBlock(newBlock) {
		newBlock.previousHash = this.getLatestBlock().hash
		newBlock.mineBlock(this.difficulty)
		this.chain.push(newBlock)
	}

	isChainValid() {
		for (let i = 1; i < this.chain.length; i++) {
			const currentBlock = this.chain[i]
			const previousBlock = this.chain[i - 1]

			if (!currentBlock.hasValidTransactions()) {
				return false
			}
			if (currentBlock.hash !== currentBlock.calculateHash()) {
				return false
			}
			if (currentBlock.previousHash !== previousBlock.hash) {
				return false
			}
		}
		return true
	}

	getChainSize() {
		return this.chain.length
	}

	createTransaction(transaction) {
		if (!transaction.fromAddress || !transaction.toAddress) {
			throw new Error('Transaction must include from and to address')
		}
		if (!transaction.isValid()) {
			throw new Error('Cannot add invalid transaction to change')
		}
		this.pendingTransactions.push(transaction)
	}

	minePendingTransactions(miningRewardAddress) {
		const rewardTx = new Transaction(
			null,
			miningRewardAddress,
			this.miningReward
		)
		this.pendingTransactions.push(rewardTx)

		console.log(this.pendingTransactions)

		let block = new Block(Date.now(), this.pendingTransactions)
		block.mineBlock(this.difficulty)

		console.log('Block successfully mined...')

		this.chain.push(block)
		this.pendingTransactions = []
	}

	getBalanceOfAddress(address) {
		let balance = 0
		for (const block of this.chain) {
			for (const transaction of block.transactions) {
				if (transaction.fromAddress === address) {
					balance -= transaction.amount
				}
				if (transaction.toAddress === address) {
					balance += transaction.amount
				}
			}
		}
		return balance
	}
}

module.exports = Blockchain
