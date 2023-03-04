export enum Network {
  ETH,
  BSC,
  POLY,
  MANTLE,
}

export enum AccessType {
  Admin,
  SubAdmin,
  Member,
}

export interface TokenInterface {
  name: string;
  address: string;
  network: Network;
  symbol: string;
  priceURL: string;
}

export interface DAOInterface {
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
  id: string;
  logoURL: string;
  name: string;
  introduction: string;
  treasuryAddress: string;
  access: AccessType;
}

export interface UserInfoInterface {
  userAddress: string;
  daoList: Array<DAOBriefInterface>;
}

export interface PermissionInterface {
  userAddress: string;
  access: AccessType;
}
