import { DAOBriefInterface } from './app.interface';

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
