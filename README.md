# PopUp Learning DApp ![Better than Kpop](https://img.shields.io/badge/Better-than%20Kpop-yellow)

![Screenshot (511)](https://github.com/user-attachments/assets/d6c8501d-76c2-4941-a19f-972553302afb)

- Backend - https://popup-gv2l.onrender.com/home
- Live- https://pop-up-tjmt.vercel.app/

# About Me
- Neha Kumari
- An Astrophile with a heterogeneous blend of arts, tech-savvy and web3 enthusiast exploring various dimensions by levitating between the real and virtual world 🔰✨
- Open Source Developer journey kickstarted with GSSoC Extended 2024 and Hacktoberfest 2024. [View Badges on Readme](https://github.com/Nkovaturient/Nkovaturient) 🌟
- New Quest Unlocked for entering the Blockhain $ web3 dimension alongside MERN Stack role 🎐⚡
- Participated in RiseIn #SheOnChain BootCamp [25 Jan 2025 - 28 Feb 2025] 💛
- RiseIn Dashboard- [RiseIn Profile](https://www.risein.com/@matrixnk) ✅
- OpenCampus ID- [matrixnk.edu] 0xA94Cb8Bb613851CadC7510956bAF64e671674A2d
- Loves stargazing, reading, listening to instrumentals [C10H12N20], and a lot more! 🙂

## Table of Contents
- [Introduction](#introduction)
- [Architecture Workflow](#architecture-workflow)
- [Features](#features)
- [Core Components](#core-components)
- [Tech Stack](#tech-stack)
- [More Updates to Do](#more-updates-to-do)

## Introduction
A gamified learning platform that ties education into pop culture or trends—whether it's learning economics through Monopoly, statistics through NBA games, or creative writing through fan fiction contests. Players engage using existing cultural knowledge, then deepen their learning through challenges and token rewards for creative or analytical thinking.

![Screenshot (513)](https://github.com/user-attachments/assets/18af33bd-b4bd-4859-8f59-c3f20112a9cc)

# Vision 
**"What if learning felt like playing your favorite game or diving into your favorite fandom?"**  

The **Pop Culture Learning dApp** turns education into an interactive, gamified experience powered by **Web3**. Whether it’s mastering economics through **Monopoly**, statistics through **NBA analytics**, or storytelling through **fan fiction contests**, we bridge knowledge with culture. Earn **NFT achievements**, join challenges, and trade in our decentralized marketplace—all secured by **smart contracts**.  

This isn’t just learning; it’s **learning reimagined**. By making education **engaging, rewarding, and culturally relevant**, we empower users to turn passion into progress, knowledge into assets, and curiosity into limitless opportunities.

## Architecture Workflow
The architecture workflow of the PopUp Learning DApp is designed to provide a seamless user experience. Below is a visual representation of the workflow:

![Screenshot (512)](https://github.com/user-attachments/assets/4ee30a89-d5cb-4892-a9ea-5d8569f1327f)


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
- Smart Contracts for minting tokens, NFTs built atop robust web3 architecture
  
![Screenshot (515)](https://github.com/user-attachments/assets/e0e537bd-385f-4608-b2ad-8efcb80492df)


# Core Components

## Client-Side
- Home: Displays a list of challenges.
- CreateChallenge: Form to create new challenges.
- Dashboard: User dashboard with tabs for profile, completed challenges, and learning graphs.
- RewardToken: Interface for minting reward tokens.
- LearningNFT: Interface for minting and viewing NFTs.
- Marketplace: Interface for listing and buying NFTs.
  
![Screenshot (514)](https://github.com/user-attachments/assets/c30625c7-2046-4803-af90-008f06de9b62)

## Server-Side
- User Routes and Controllers: Handles user-related operations.
- Challenge Routes and Controllers: Manages challenge-related operations.
- Analytics Routes and Controllers: Provides analytics and statistics.

## Smart Contracts Addresses (deployed on Educhain Testnet Network Open Campus)
- LEARNING NFT= [Deployed](https://edu-chain-testnet.blockscout.com/token/0x83e3D68C39233aD3dD13de2aDB48Cd1F8E5dA54d)
- REWARD TOKEN= [Deployed](https://edu-chain-testnet.blockscout.com/token/0xDee0Da1A7810B5e23222d69B82342eDd0F3D3c5e)
- MARKETPLACE= [Deployed](https://edu-chain-testnet.blockscout.com/address/0xAE418E8a6b67E9596fCFd5eD7Cc54ED91F6ce300)

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

# Getting Started

## Prerequisites
- Node.js v20.11.0
- MongoDB 
- MetaMask
- EduChain Testnet Network (contract deployment)
- Open-Campus Network Details: https://open-campus-docs.vercel.app/getting-started
- Open-Campus Faucet: https://drpc.org/faucet/open-campus-codex
  
## Installation & Setup guide
1) Clone the repository:

   ```
   git clone https://github.com/yourusername/PopUp-Learning-DApp.git
    cd PopUp-Learning-DApp
   ```

3) Install dependencies for the client:
     ```
   cd client
   npm install
   ```
   
5) Install dependencies for the server:
     ```
      cd ../server
     npm install
     ```
   
7) Run the backend server
   ```
   npm start
   server running on http://localhost:3000/home
   ```
   
9) Run the vite server
   ```
   npm run dev
   server running on http://localhost:5173
   ```

10) Go ahead and feel free to contribute, raise an issue or suggest a feedback for improvements. Happy to hear from you!
   
## Thank you for using PopUp Learning DApp! We hope you enjoy the experience. 🌟😄

  
