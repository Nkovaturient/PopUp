// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;

    struct Listing {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => Listing) public listings;

    event ItemListed(uint256 indexed itemId, address indexed nftContract, uint256 indexed tokenId, address seller, uint256 price);
    event ItemSold(uint256 indexed itemId, address indexed buyer, uint256 price);
    event ItemCanceled(uint256 indexed itemId);

    constructor() Ownable(msg.sender) {}

    function itemCount() external view returns (uint256)  {
        return _itemIds.current();
    }

    function listItem(address nftContract, uint256 tokenId, uint256 price) external {
        require(price > 0, "Price must be greater than 0");
        require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "Not NFT owner");
        // Check if the NFT is approved for transfer
        require(IERC721(nftContract).getApproved(tokenId) == address(this) || IERC721(nftContract).isApprovedForAll(msg.sender, address(this)),
        "Marketplace not approved"
        );

        // Transfer NFT to Marketplace contract
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        listings[itemId] = Listing(itemId, nftContract, tokenId, payable(msg.sender), price, false);

        emit ItemListed(itemId, nftContract, tokenId, msg.sender, price);
    }

    function buyItem(uint256 itemId) external payable nonReentrant {
        Listing storage item = listings[itemId];
        require(item.price > 0, "Item not listed");
        require(msg.value >= item.price, "Insufficient funds");
        require(!item.sold, "Item already sold");

        item.sold = true;

        IERC721(item.nftContract).transferFrom(address(this), msg.sender, item.tokenId);
        item.seller.transfer(item.price);

        emit ItemSold(itemId, msg.sender, item.price);
    }
}
