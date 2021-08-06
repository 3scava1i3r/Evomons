// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;




uint256 constant NUMERIC_TRAITS_NUM = 5;
uint256 constant PORTAL_EVOMONS_NUM = 5;



struct Evomon {
    string name;
    uint256 randomNum;
    uint256 xp;
    uint256 minStake;
    uint256 battles;
    address collateralType;
    address owner;
    uint8 status;  // 0 == Pack ; 1 == VRF pending ; 2 == Open Pack ; 3 == FIRB done (Evomon Happy)
    uint40 lastBattle;
    address escrow;
    // uint16 genId
    bool locked;
    
}

struct Dimensions {
    uint8 x;
    uint8 y;
    uint8 width;
    uint8 height;
}

struct Gen {
    uint256 GenMaxSize; //The max size of the Gen
    uint256 packPrice;
    bytes3 bodyColor;
    uint24 totalCount;
}

struct SvgLayer {
    address svgLayersContract;
    uint16 offset;
    uint16 size;
} 

struct EvomonCollateralTypeInfo {
    
    bytes3 primaryColor;
    bytes3 secondaryColor;
    bytes3 cheekColor;
    uint8 svgId;
    uint8 eyeShapeSvgId;
    uint16 conversionRate; //conversionRate for the price of this collateral in relation to 1 USD.
    bool delisted;
    
}

/*struct ERC1155Listing {
    uint256 listingId;
    address seller;
    address erc1155TokenAddress;
    uint256 erc1155TypeId;
    uint256 category; // 0 is wearable, 1 is badge, 2 is consumable, 3 is tickets
    uint256 quantity;
    uint256 priceInWei;
    uint256 timeCreated;
    uint256 timeLastPurchased;
    uint256 sourceListingId;
    bool sold;
    bool cancelled;
}*/


struct ERC721Listing {
    uint256 listingId;
    address seller;
    address erc721TokenAddress;
    uint256 erc721TokenId;
    uint256 category;  // 0 == Pack ; 1 == VRF pending ; 2 == Open Pack ; 3 == FIRB done (Evomon Happy)
    uint256 priceInWei;
    uint256 timeCreated;
    uint256 timePurchased;
    bool cancelled;
}


struct AppStorage {
    uint32[] tokenIds;
    mapping (address => uint32[]) ownerTokenIds;
    mapping(address => EvomonCollateralTypeInfo) collateralTypeInfo;
    mapping(address => uint256) collateralTypeIndexes;
    mapping(bytes32 => SvgLayer[]) svgLayers;
    mapping(uint256 => Gen) Gen;
    mapping(uint256 => uint256) tokenIdToRandomNumber;
    mapping(uint256 => Evomon) evomons;
    mapping(address => mapping(uint256 => uint256)) ownerTokenIdIndexes;
    mapping(string => bool) EvomonNamesUsed;
    mapping(uint256 => uint256) tokenIdIndexes;
    uint32 tokenIdCounter;
    uint16 currentGenId;
    string name;
    string symbol;
    
    
/*    mapping(address => mapping(address => bool)) operators;
    mapping(uint256 => address) approved;
    mapping(address => uint256) metaNonces;*/

    //Addresses
/*    address[] collateralTypes;
    address ghstContract;
    address childChainManager;
    address gameManager;
    address dao;
    address daoTreasury;
    address pixelCraft;
    address rarityFarming;
    string itemsBaseUri;
    bytes32 domainSeparator;*/
    //VRF
    mapping(bytes32 => uint256) vrfRequestIdToTokenId;
    mapping(bytes32 => uint256) vrfNonces;
    bytes32 keyHash;
    uint144 fee;
    address vrfCoordinator;
    ILink link;
    
    // Marketplace 


}



library LibAppStorage {
    function diamondStorage() internal pure returns (AppStorage storage ds) {
        assembly {
            ds.slot := 0
        }
    }

    function abs(int256 x) internal pure returns (uint256) {
        return uint256(x >= 0 ? x : -x);
    }
}





contract modifier {
    AppStorage internal s;
    
    
    
}