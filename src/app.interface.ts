export enum Network {
  ETH,
  BSC,
  POLY,
  MANTLE,
}

export interface TokenInterface {
  name: string;
  address: string;
  network: Network;
  symbol: string;
  priceURL: string;
}

export interface DAOInterface {
  _id: string;
  logoURL: string;
  name: string;
  introduction: string;
  admin: Array<string>;
  subAdmin: Array<string>;
  members: Array<string>;
  tokens: Array<TokenInterface>;
  treasuryAddress: string;
}

export interface DAOBriefInterface {
  _id: string;
  logoURL: string;
  name: string;
  introduction: string;
  treasuryAddress: string;
}

export interface UserInfoInterface {
  userAddress: string;
  adminList: Array<DAOBriefInterface>;
  subAdminList: Array<DAOBriefInterface>;
  memberList: Array<DAOBriefInterface>;
}
