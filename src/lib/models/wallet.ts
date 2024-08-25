interface CircleWallet {
  accountType: string; // The type of account
  address: string; // The blockchain address
  blockchain: string; // The blockchain network
  createDate: string; // Date string for account creation
  custodyType: string; // The type of custody
  id: string; // Unique identifier for the account
  state: string; // The current state of the account
  updateDate: string; // Date string for last update
  userId: string; // Unique identifier for the user
  walletSetId: string; // Unique identifier for the wallet set
}

interface TokenBalance {
  amount: string; // The amount of the token
  token: {
    blockchain: string; // The blockchain network
    createDate: string; // ISO 8601 date string for token creation
    decimals: number; // The number of decimal places for the token
    id: string; // Unique identifier for the token
    isNative: boolean; // Indicates if the token is a native token
    name: string; // The name of the token
    standard: string; // The token standard (e.g., ERC20)
    symbol: string; // The symbol of the token
    tokenAddress: string; // The blockchain address of the token
  };
  updateDate: string; // ISO 8601 date string for last update
}
