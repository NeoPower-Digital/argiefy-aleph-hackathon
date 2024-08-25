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
