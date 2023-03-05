// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract daoTransactions is AccessControl  {
    bytes32 public constant ROLE_ADMIN = keccak256("ROLE_ADMIN");
    mapping (uint256 => transactionDetails) inTransactions;
    mapping (uint256 => transactionDetails) outTransactions;
    address public treasuryAddress;

    constructor(address walletAddress) {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(ROLE_ADMIN, msg.sender);
        treasuryAddress = walletAddress;
    }

    struct transactionDetails {
        string name;
        uint description;
        string label;
    }

    function updateTransactionsMapping(transactionDetails[] memory txndetails, uint256[] memory txnsHashes, bool isIn) public {
        require(hasRole(ROLE_ADMIN, msg.sender), "Caller must have user role");
        if (isIn) {
            for (uint8 i = 0; i < txnsHashes.length; i ++) {
                inTransactions[txnsHashes[i]] = txndetails[i];
            }
        } else {
            for (uint8 i = 0; i < txnsHashes.length; i ++) {
                outTransactions[txnsHashes[i]] = txndetails[i];
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