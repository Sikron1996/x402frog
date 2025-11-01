export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-402-Payer');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const schema = {
    x402Version: 1,
    accepts: [
      {
        scheme: "exact",
        network: "base",
        chainId: 8453,
        maxAmountRequired: "3000000",
        resource: "https://x402frog.vercel.app/api/x402",
        description: "Mint 1 x402Cats NFT (Gasless via PayAI)",
        mimeType: "application/json",
        payTo: "0x63AcAd363c60178e0153268a272876197770bFEf",
        maxTimeoutSeconds: 300,
        asset: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
        facilitator: "https://facilitator.payai.network",
        outputSchema: {
          input: {
            type: "http",
            method: "POST",
            headerFields: {
              "X-402-Payer": {
                type: "string",
                required: true,
                description: "Wallet address of the payer (set by facilitator)"
              }
            }
          },
          output: {
            success: { type: "boolean" },
            transactionHash: { type: "string" },
            tokenIds: { type: "array" },
            message: { type: "string" },
            recipient: { type: "string" }
          }
        },
        extra: {
          contractAddress: "0x63AcAd363c60178e0153268a272876197770bFEf",
          network: "base",
          chainId: 8453,
          quantity: 1,
          mintFunction: "mint",
          maxPerWallet: 20,
          totalSupply: 5555,
          pricePerNFT: "3000000"
        }
      }
    ]
  };

  return res.status(402).json(schema);
}
