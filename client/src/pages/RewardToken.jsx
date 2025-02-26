import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { storeContext } from "../context/storeContext";

const RewardToken = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [rewardAmount, setRewardAmount] = useState("");
  const [minting, setMinting] = useState(false);
  const [balance, setBalance] = useState(0);
  const { connectWallet, account, error, setError, getContractInstance } =
    useContext(storeContext);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initializeContract = async () => {
      if (!account) {
        await connectWallet();
      }
      const rewardTokenContract = await getContractInstance("RewardToken");
      setContract(rewardTokenContract);
    };

    initializeContract();
  }, [connectWallet, account, getContractInstance]);

  useEffect(() => {
    if (contract) {
      fetchBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  const fetchBalance = async () => {
    try {
      const balance = await contract.balanceOf(account);
      setBalance(ethers.formatEther(balance));
    } catch (err) {
      setError(err.message);
      // toast.error(`${err.message}`, { theme: "dark" });
      console.error("Failed to fetch balance:", err.message);
    }
  };

  const mintRewardToken = async () => {
    if (!contract || !rewardAmount.trim()) return;

    try {
      setMinting(true);
      setError("");

      const tx = await contract.mint(walletAddress, ethers.parseEther(rewardAmount));
      await tx.wait();

      toast.success("Reward tokens minted successfully!", { theme: "dark" });
      setRewardAmount("");
      fetchBalance();
    } catch (err) {
      setError(err.message);
      // toast.error(`${err.message}`, { theme: "dark" });
      console.error("Failed to mint reward tokens:", err.message);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl p-8">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Reward Token
          </h1>
          <p className="text-sm text-gray-600 mb-4">Connected: {account}</p>
          <p className="text-sm text-gray-600 mb-4">Balance: {balance} ETH</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="walletAddress"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              wallet Address
            </label>
            <input
              type="text"
              id="walletAddress"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter receiver's wallet address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={minting}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="rewardAmount"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Reward Amount (ETH)
            </label>
            <input
              type="text"
              id="rewardAmount"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(e.target.value)}
              placeholder="Enter Reward Amount (ETH)"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={minting}
            />
          </div>

          <button
            onClick={mintRewardToken}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
            disabled={minting || !rewardAmount.trim()}
          >
            {minting ? "Minting..." : "Mint Reward Tokens"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RewardToken;
