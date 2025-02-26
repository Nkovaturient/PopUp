// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract RewardToken is ERC20, Ownable, ReentrancyGuard {
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10 ** 18;

    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public lastStakeTime;

    uint256 public stakingRewardRate = 1; // 1% per year

    event Staked(address indexed user, uint256 amount);

    constructor(string memory name, string memory symbol) ERC20(name, symbol) Ownable(msg.sender) {
       super._mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        super._mint(to, amount);
    }

    function burn(uint256 amount) external {
        super._burn(msg.sender, amount);
    }

    function burnFrom(address account, uint256 amount) external onlyOwner {
        super._burn(account, amount);
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(super.balanceOf(msg.sender) >= amount, "Insufficient balance");

        super._transfer(msg.sender, address(this), amount);
        stakingBalance[msg.sender] += amount;
        lastStakeTime[msg.sender] = block.timestamp;

        emit Staked(msg.sender, amount);
    }

    receive() external payable {}
}
