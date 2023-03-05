// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract Dao is AccessControl {
  string public logo_URL;
  string public name;
  string public introduction;
  address public treasuryAddress;
  address public ownerAddress;
  address[] public tokenLists;

  bytes32 public constant ROLE_ADMIN = keccak256("ROLE_ADMIN");
  bytes32 public constant ROLE_SUBADMIN = keccak256("ROLE_SUBADMIN");
  bytes32 public constant ROLE_MEMBER = keccak256("ROLE_MEMBER");

  constructor(
    string memory _logo_URL, 
    string memory _name, 
    string memory _introduction,
    address _treasuryAddress
  ) {
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    _setupRole(ROLE_ADMIN, msg.sender);
    logo_URL = _logo_URL;
    name = _name;
    introduction = _introduction;
    treasuryAddress = _treasuryAddress;
    ownerAddress = msg.sender;
  }

  function getDAOInfo() external view returns (string memory, string memory, string memory, address) {
    return (logo_URL, name, introduction, treasuryAddress);
  }

  function updateDAOLogo(
    string memory _logo_URL
  ) public onlyRole(ROLE_ADMIN) {
    logo_URL = _logo_URL;
  }

  function updateDAOName(
    string memory _name
  ) public onlyRole(ROLE_ADMIN)  {
    name = _name;
  }

  function updateDAOIntroduction(
    string memory _introduction
  ) public onlyRole(ROLE_ADMIN)  {
    introduction = _introduction;
  }

  // function getAdminMembers() public view onlyRole(ROLE_ADMIN) returns (address[] memory){
  //   return getRoleMembers(ROLE_ADMIN);
  // }

  // function getSubAdminMembers() public view onlyRole(ROLE_ADMIN) returns (address[] memory){
  //   return getRoleMembers(ROLE_SUBADMIN);
  // }

  // function getMembers() public view onlyRole(ROLE_ADMIN) returns (address[] memory){
  //   return getRoleMembers(ROLE_MEMBER);
  // }

  function deleteMembers(address userAddress) public onlyRole(ROLE_ADMIN) {
    revokeRole(ROLE_MEMBER, userAddress);
  }

  function deleteSubAdmin(address userAddress) public onlyRole(ROLE_ADMIN) {
    revokeRole(ROLE_SUBADMIN, userAddress);
  }

  function addTokenList(address tokenAddress) public onlyRole(ROLE_ADMIN) {
    bool flag = false;
    for (uint8 i = 0; i < tokenLists.length; i ++) {
      if (tokenLists[i] == tokenAddress) {
        flag = true;
      }
    }
    if (!flag) {
      tokenLists.push(tokenAddress);
    }
  }

  function removeTokenFromList(address tokenAddress) public onlyRole(ROLE_ADMIN) {
    for (uint8 i = 0; i < tokenLists.length; i ++) {
      if (tokenLists[i] == tokenAddress) {
        delete tokenLists[i];
      }
    }
  }
}