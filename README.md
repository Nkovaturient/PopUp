# PopUp Learning DApp

![PopUp Learning DApp](https://img.shields.io/badge/PopUp-Learning%20DApp-blue)

## Table of Contents
- [Introduction](#introduction)
- [Architecture Workflow](#architecture-workflow)
- [Features](#features)
- [Core Components](#core-components)
- [Tech Stack](#tech-stack)
- [More Updates to Do](#more-updates-to-do)

## Introduction
PopUp Learning DApp is a decentralized application designed to enhance learning through interactive challenges, rewards, and NFTs. Users can create, view, and participate in challenges, mint NFTs, and explore a marketplace for trading.

## Architecture Workflow
The architecture workflow of the PopUp Learning DApp is designed to provide a seamless user experience. Below is a visual representation of the workflow:

```plaintext
+------------------+       +------------------+       +------------------+
|                  |       |                  |       |                  |
|  Create Account  +-------> Create Challenge +------->  View Challenge  |
|                  |       |                  |       |                  |
+------------------+       +------------------+       +------------------+
        |                          |                          |
        v                          v                          v
+------------------+       +------------------+       +------------------+
|                  |       |                  |       |                  |
|    Mint NFTs     +------->   Marketplace    +------->  Send Rewards    |
|                  |       |                  |       |                  |
+------------------+       +------------------+       +------------------+
        |                          |                          |
        v                          v                          v
+------------------+       +------------------+       +------------------+
|                  |       |                  |       |                  |
| Explore Dashboard|       | Take Challenges          | You gonna love   |
|                  |       |                  |       | this popup🌟     |
+------------------+       +------------------+       +------------------+

```
## Features
- User Authentication: Secure user registration and login.
- Challenge Creation: Users can create and participate in challenges.
- NFT Minting: Mint achievements as NFTs.
- Marketplace: List and buy NFTs.
- Reward Distribution: Send rewards and NFTs to other users.
- Dashboard: Track progress, view completed challenges, and manage profile.

# Core Components

## Client-Side
- Home: Displays a list of challenges.
- CreateChallenge: Form to create new challenges.
- Dashboard: User dashboard with tabs for profile, completed challenges, and learning graphs.
- RewardToken: Interface for minting reward tokens.
- LearningNFT: Interface for minting and viewing NFTs.
- Marketplace: Interface for listing and buying NFTs.
- ArchitectureFlow: Visual representation of the app's architecture workflow.

## Server-Side
- User Routes and Controllers: Handles user-related operations.
- Challenge Routes and Controllers: Manages challenge-related operations.
- Analytics Routes and Controllers: Provides analytics and statistics.

## Tech Stack
- Frontend: React, Tailwind CSS, React Router, React Tabs, Axios, React Toastify
- Backend: Node.js, Express, MongoDB, Mongoose
- Blockchain: Solidity, Ethers.js, OpenZeppelin
- Tools: Vite, ESLint, PostCSS

## More Updates to Do
- User Notifications: Implement a notification system for user activities.
- Challenge Leaderboard: Add a leaderboard to display top users.
- Enhanced Security: Implement additional security measures for user data.
- Mobile Responsiveness: Improve the mobile responsiveness of the app.
- Smart Contract Upgrades: Upgrade smart contracts for better performance and security.

  
