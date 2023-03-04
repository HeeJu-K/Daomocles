import { Logger } from '@nestjs/common';
import {
  AccessType,
  DAOBriefInterface,
  DAOInterface,
  PermissionInterface,
  TokenInterface,
} from './app.interface';
import axios from 'axios';

export function findDaoListKeyByTreasuryAddress(
  daoList: Array<DAOBriefInterface>,
  treasuryAddress: string,
): number {
  for (let i = 0; i < daoList.length; i++) {
    if (daoList[i].treasuryAddress == treasuryAddress) {
      return i;
    }
  }
  return -1;
}

export function getDAOPermissionInList(
  dao: DAOInterface,
): Array<PermissionInterface> {
  const result: Array<PermissionInterface> = [];
  for (let i = 0; i < dao.admin.length; i++) {
    result.push({
      userAddress: dao.admin[i],
      access: AccessType.Admin,
    });
  }
  for (let i = 0; i < dao.subAdmin.length; i++) {
    result.push({
      userAddress: dao.subAdmin[i],
      access: AccessType.SubAdmin,
    });
  }
  for (let i = 0; i < dao.members.length; i++) {
    result.push({
      userAddress: dao.members[i],
      access: AccessType.Member,
    });
  }
  return result;
}

export function findTokenListKeyByToken(
  tokenList: Array<TokenInterface>,
  tokenAddress: string,
  tokenNetwork: number,
): number {
  for (let i = 0; i < tokenList.length; i++) {
    if (
      tokenList[i].address == tokenAddress &&
      tokenList[i].network == tokenNetwork
    ) {
      return i;
    }
  }
  return -1;
}

export async function findPlatformIDByChainIdentifier(
  chainIdentifier: number,
): Promise<string> {
  const response =
    await axios.get(`https://api.coingecko.com/api/v3/asset_platforms
    `);
  for (let i = 0; i < response.data.length; i++) {
    if (response.data[i].chain_identifier == chainIdentifier) {
      return response.data[i].id;
    }
  }
  return null;
}

export async function getTokenSymbolFromNetwork(
  tokenAddress: string,
  tokenNetwork: number,
  token: TokenInterface,
): Promise<TokenInterface> {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/ethereum/contract/${tokenAddress}`,
  );
  const data = response.data;
  token.symbol = data.symbol;
  token.name = data.name;
  return token;
}
