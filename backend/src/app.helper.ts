import {
  AccessType,
  DAOBriefInterface,
  DAOInterface,
  Network,
  PermissionInterface,
  TokenInterface,
} from './app.interface';

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
  tokenNetwork: Network,
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
