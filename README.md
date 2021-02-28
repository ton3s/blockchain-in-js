# Blockchain in JS

Example code that demonstrates the fundamentals of blockchain. In particular it shows how funds are sent from wallet to another by generating signed transactions of which are then verified using proof of work consensus protocol.

### Result

```
❯ node index.js
[
  Transaction {
    fromAddress: '04e2a91412bf9761365f7f31d3cf1ff6689a8393c8774536b189a3c6bddf98ee8d675a9ddfc10d17f3d04a79a5446a46b48dcf720ce53beaf9896c2a8457ff2b85',
    toAddress: '04fdfe537e1e891d29f5cc5d4c343fb3b7d56d6dcf7a141eefb7088b0f2e5a37aca1efe37031e083957962a53102ab40c1b6068a2b4b81e4e7aa71bb006b427de8',
    amount: 21,
    signature: '3044022070b981f8c6a9236607244fb89a234487af4f068db6846608a035e8a124bef2fd02201925a8f383b9ce75348a54f29186c36631ceaf32a56bf2df94410262965dda6a'
  },
  Transaction {
    fromAddress: null,
    toAddress: '04e2a91412bf9761365f7f31d3cf1ff6689a8393c8774536b189a3c6bddf98ee8d675a9ddfc10d17f3d04a79a5446a46b48dcf720ce53beaf9896c2a8457ff2b85',
    amount: 100
  }
]
Block mined 000f37b823fbc2ee79920fb1a99709836f95cce879f10352204666d89f2bae65
Block successfully mined...
Balance of the first wallet: 79
Balance of the second wallet: 21
```
