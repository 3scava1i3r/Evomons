// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;


import { Evomoninfo } from '../libs/LibEvomon.sol';
import { AppStorage } from '../libs/LibAppStorage.sol';

contract EvomonFacet {
    AppStorage internal s;

    function totalSupply() external view returns (uint256 totalSupply_) {
        totalSupply_ =  s.tokenIds.length;
    }

    /// @return balance_ The number of mons owner by '_owner'

    function balanceOf(address _owner) external view returns (uint256 balance_)
    {
        require(_owner != address(0) , "Evomon: _owner can not be address(0)");
        balance_ = s.ownerTokenIds[_owner].length;
    }

    function getEvomon(uint256 _tokenId) external view returns (EvomonInfo memory evomoninfo_){
        
    }
    /// @notice get tokenId from index in the array 

    function tokenByIndex(uint256 _index) external view returns (uint256 tokenId_) {
        require(_index <= s.tokenIds.length , "Index beyond total supply");
        tokenId_ = s.tokenIds[_index];
    }
    /// @notice Enumerate NFTs of a particular owner

    function tokenOfOwnerByIndex(uint256 _index, address _owner) external view returns(uint256 tokenId_){
        require(_index <= s.ownerTokenIds[_owner].length , "Index has to be less than total mons owned")
        tokenId_ = s.ownerTokenIds[_owner][_index];
    }

    function tokenIdsOfOwner(address _owner) external view returns (uint256 tokenId_){
        
    }


}