pragma solidity ^0.8.17;

import "./Dao.sol";
import "./DaoTransactions.sol";

contract DaoFactory {
  address public daoOwner;
  mapping(address => address[]) userToDAO;
  mapping(address => address[]) userToDaoTransactions;

  constructor (address _daoOwner) {
    daoOwner = _daoOwner;
  }

  modifier isAdmin(address treasuryAddress) {
    Dao dao = Dao(treasuryAddress);
    require(dao.ownerAddress == msg.sender); // check the condition before executing the function
    _; // execute remaining code in the fuctions
  }

  function createDAO(
    string memory _logo_URL, 
    string memory _name, 
    string memory _introduction,
    address treasuryAddress
  ) external isAdmin returns (address) {
    Dao newDao = new Dao(_logo_URL, _name, _introduction, treasuryAddress);
    DaoTransactions daoTransactions = new DaoTransactions(treasuryAddress);
    if (userToDAO[msg.sender]) {
      userToDAO[msg.sender].push(address(newDao));
      userToDaoTransactions[msg.sender].push(address(daoTransactions));
    } else {
      address[] array = [];
      userToDAO[msg.sender] = array.push(address(newDao));
      array.pop();
      userToDaoTransactions[msg.sender] = array.push(address(daoTransactions));
    }
    return address(newDao);
  }

  function deleteDAO(
    address treasuryAddress
  ) external isAdmin(treasuryAddress) {
    for (uint i = 0; i < daoList.length; i ++) {
      if (daoList[i] == treasuryAddress) {
        delete daoList[i];
        break;
      }
    }
    for (uint i = 0; i < userToDAO[msg.sender].length; i ++) {
      if (userToDAO[msg.sender][i] == treasuryAddress) {
        delete userToDAO[msg.sender][i];
        delete userToDaoTransactions[msg.sender][i];
        break;
      }
    }
  }

  function getUsersDAO() external view returns(address[]) {
    return userToDAO[msg.sender];
  }
}