// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct NFTMetadata {
        string name;
        string symbol;
        string description;
        string image;
    }

    mapping(uint256 => NFTMetadata) public nftDetails;

    event NFTMinted(address indexed owner, uint256 tokenId, string name, string symbol, string description, string image);

    constructor() ERC721("MyNFT", "MNFT") {}

    function mintNFT(string memory name, string memory symbol, string memory description, string memory image) external returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        // Store metadata in contract
        nftDetails[newItemId] = NFTMetadata(name, symbol, description, image);

        emit NFTMinted(msg.sender, newItemId, name, symbol, description, image);
        return newItemId;
    }

    function getNFTMetadata(uint256 tokenId) external view returns (NFTMetadata memory) {
        return nftDetails[tokenId];
    }
}

