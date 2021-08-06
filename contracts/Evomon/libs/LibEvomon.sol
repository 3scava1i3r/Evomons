// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;






struct EvomonInfo {
    uint256 tokenId;
    
}

library LibEvomon {
    
    uint8 constant STATUS_CLOSED_PACK = 0;
    uint8 constant STATUS_VRF_PENDING = 1;
    uint8 constant STATUS_OPENED_PACK = 2;

}