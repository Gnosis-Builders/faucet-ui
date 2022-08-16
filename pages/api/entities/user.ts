export interface UserEntity {
  id?: number;
  walletAddresses: string;
  ipAddress: string;
  networks: string;
  expiry: string;
  twitterToken?: string;
  twitterSecret?: string;
  twitterId?: string;
  lastWalletAddress: string;
}
