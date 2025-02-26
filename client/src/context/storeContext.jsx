import { createContext, useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "react-toastify";
import { BrowserProvider, Contract } from "ethers";
import propTypes from "prop-types";
import LearningNFTABI from "../contracts/ABI/learningNftABI.json";
import MarketplaceABI from "../contracts/ABI/marketplaceABI.json";
import RewardTokenABI from "../contracts/ABI/rewardTokenABI.json";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
  const [account, setAccount] = useState(null);
  const [contracts, setContracts] = useState({}); 
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  const [token, setToken]=useState('')
  const[userId, setUserId]=useState('')

  // Contract addresses
  const CONTRACT_ADDRESSES = useMemo(() => ({
    LearningNFT: import.meta.env.VITE_LEARNINGNFT_CA,
    Marketplace: import.meta.env.VITE_MARKETPLACE_CA,
    RewardToken: import.meta.env.VITE_REWARDTOKEN_CA,
  }), []);

  const contractABIs = useMemo(() => ({
    LearningNFT: LearningNFTABI,
    Marketplace: MarketplaceABI,
    RewardToken: RewardTokenABI,
  }), []);

  // Centralized function to handle contract instantiation
  const getContractInstance = useCallback(
    async (contractName) => {
      try {
        if (!window.ethereum) {
          throw new Error("MetaMask is not installed.");
        }

        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractAddress = CONTRACT_ADDRESSES[contractName];
        const contractABI = contractABIs[contractName];

        if (!contractAddress || !contractABI) {
          throw new Error(`Contract address or ABI not found for ${contractName}`);
        }

        const contractInstance = new Contract(
          contractAddress,
          contractABI,
          signer
        );

        setContracts((prevContracts) => ({
          ...prevContracts,
          [contractName]: contractInstance,
        }));
        setError(null);

        toast.info(`Fetched ${contractName} contract instance`);
        return contractInstance; // Return the instance
      } catch (err) {
        // setError(err.message);
        toast.error(`${err.message}`, { theme: "dark" });
        console.error(`Error fetching ${contractName} contract instance:`, err.message);
        return null;
      }
    }, [contractABIs, CONTRACT_ADDRESSES]);

  const handleAccountsChanged = useCallback((accounts) => {
    if (accounts.length > 0) {
      setAccount(accounts[0]);
      localStorage.setItem("connectedAccount", accounts[0]);
      toast.success(`Account changed to: ${accounts[0]}`);
    } else {
      setAccount(null);
      localStorage.removeItem("connectedAccount");
      toast.info("Wallet Disconnected from Provider");
    }
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      if (!window.ethereum) {
        toast.info("Please install MetaMask to proceed!", { theme: "dark" });
        throw new Error("Please install MetaMask!");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      localStorage.setItem("connectedAccount", accounts[0]);
      toast.success(`Connected: ${accounts[0]}`);
    } catch (err) {
      setError(err.message);
      toast.error(`${err.message}`, { theme: "dark" });
      console.log("Initialization failed:", err.message);
    }
  }, []);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const storedAccount = localStorage.getItem("connectedAccount");

          if (storedAccount) {
            const accounts = await window.ethereum.request({
              method: "eth_accounts",
            });

            if (accounts.length > 0) {
              if (accounts.includes(storedAccount)) {
                setAccount(storedAccount);
              } else {
                setAccount(accounts[0]);
                localStorage.setItem("connectedAccount", accounts[0]);
              }
            } else {
              localStorage.removeItem("connectedAccount");
              setAccount(null);
            }
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
          localStorage.removeItem("connectedAccount");
          setAccount(null);
        }
      }
    };

    checkConnection();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);

      window.ethereum.on("chainChanged", () => {
        toast.info("Network changed. Reloading...");
        window.location.reload();
      });

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
        window.ethereum.removeListener("chainChanged", () => {});
      };
    }
  }, [handleAccountsChanged]);

  useEffect(() => {
    if (localStorage.getItem('userId') || localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
      setUserId(localStorage.getItem('userId'))
      
    }
  }, [token, userId]);

  const contextValue = {
    userId,
    setUserId,
    account,
    setAccount,
    connectWallet,
    contracts,
    getContractInstance,
    error,
    setError,
    CONTRACT_ADDRESSES,
    token,
    setToken,
    navigate
  };

  StoreContextProvider.propTypes = {
    children: propTypes.node.isRequired,
  };

  return (
    <storeContext.Provider value={contextValue}>{props.children}</storeContext.Provider>
  );
};

export default StoreContextProvider;