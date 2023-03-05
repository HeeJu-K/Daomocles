// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract DaoTransactions is AccessControl  {
    bytes32 public constant ROLE_ADMIN = keccak256("ROLE_ADMIN");
    bytes32 public constant ROLE_SUBADMIN = keccak256("ROLE_SUBADMIN");
    bytes32 public constant ROLE_MEMBER = keccak256("ROLE_MEMBER");
    mapping (uint256 => TransactionDetails) inTransactions;
    mapping (uint256 => TransactionDetails) outTransactions;
    address public treasuryAddress;

    constructor(address walletAddress) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ROLE_ADMIN, msg.sender);
        treasuryAddress = walletAddress;
    }

    struct TransactionDetails {
        string name;
        string description;
        string label;
    }

    function updateTransactionsMapping(
        string[] memory names, 
        string[] memory descriptions,
        string[] memory labels,
        uint256[] memory txnsHashes, 
        bool isIn
    ) public onlyRole(ROLE_ADMIN) {
        require(hasRole(ROLE_ADMIN, msg.sender), "Caller must have user role");
        require(names.length == descriptions.length, "Name and Description Length not equal");
        require(labels.length == descriptions.length, "Name and Description Length not equal");
        if (isIn) {
            for (uint8 i = 0; i < txnsHashes.length; i ++) {
                TransactionDetails memory data = TransactionDetails({
                    name: names[i],
                    description: descriptions[i],
                    label:  labels[i]
                });
                inTransactions[txnsHashes[i]] = data;
            }
        } else {
            for (uint8 i = 0; i < txnsHashes.length; i ++) {
                TransactionDetails memory data = TransactionDetails({
                    name: names[i],
                    description: descriptions[i],
                    label:  labels[i]
                });
                inTransactions[txnsHashes[i]] = data;
            }
        }
    }

    function getInTransactions(bool isIn, uint256 txnHash) view public returns (string memory, uint, string memory) {
        if (isIn) {
            return (inTransactions[txnHash].name, inTransactions[txnHash].description, inTransactions[txnHash].label);
        } else {
            return (outTransactions[txnHash].name, outTransactions[txnHash].description, outTransactions[txnHash].label);
        }
    }

    function grantUserAdminRole(address user) public {
        grantRole(ROLE_ADMIN, user);
    }

    function revokeUserAdminRole(address user) public {
        revokeRole(ROLE_ADMIN, user);
    }
}