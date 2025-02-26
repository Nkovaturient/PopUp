import { useState, useEffect, useContext } from "react";
import { ethers, Contract, BrowserProvider } from "ethers";
import { toast } from "react-toastify";
import { storeContext } from "../context/storeContext";
import nftAbi from "../contracts/ABI/nftABI.json";

const Marketplace = () => {
  const [nftContractAddress, setNftContractAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [price, setPrice] = useState("");
  const [listing, setListing] = useState(false);
  const [buying, setBuying] = useState(false);
  const [listings, setListings] = useState([]);
  const { connectWallet, account, error, setError, getContractInstance } =
    useContext(storeContext);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initializeContract = async () => {
      if (!account) {
        await connectWallet();
      }
      const marketplaceContract = await getContractInstance("Marketplace");
      setContract(marketplaceContract);
    };

    initializeContract();
  }, [connectWallet, account, getContractInstance]);

  useEffect(() => {
    if (contract) {
      fetchListings();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contract]);

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       if (!window.ethereum) {
  //         toast.info("Please install MetaMask to proceed!", { theme: "dark" });
  //         throw new Error("Please install MetaMask!");
  //       }

  //       const accounts = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       setAccount(accounts[0]);

  //       const provider = new ethers.BrowserProvider(window.ethereum);
  //       const signer = await provider.getSigner();
  //       const contractInstance = new ethers.Contract(
  //         CONTRACT_ADDRESS,
  //         MarketplaceABI,
  //         signer
  //       );
  //       setContract(contractInstance);

  //       window.ethereum.on("accountsChanged", (accounts) => {
  //         setAccount(accounts[0]);
  //       });

  //     } catch (err) {
  //       setError(err.message);
  //       toast.error(`${err.message}`, { theme: "dark" });
  //       console.error("Initialization failed:", err.message);
  //     }
  //   };

  //   init();

  //   return () => {
  //     if (window.ethereum) {
  //       window.ethereum.removeAllListeners();
  //     }
  //   };
  // }, []);

  const fetchListings = async () => {
    try {
      const itemCount = await contract.itemCount();
      const items = [];

      for (let i = 1; i <= itemCount; i++) {
        const listing = await contract.listings(i);
        console.log("listed history=", listing)
        items.push(listing);
      }

      setListings(items);
    } catch (err) {
      setError(err.message);
      toast.error(`${err.message}`, { theme: "dark" });
      console.error("Failed to fetch listings:", err.message);
    }
  };

  const checkOwnership = async () => {
    if (!nftContractAddress.trim() || !tokenId.trim()) {
      toast.error("Please enter a valid NFT contract address and Token ID!", {
        theme: "dark",
      });
      return;
    }

    const marketplaceAddress = import.meta.env.VITE_MARKETPLACE_CA;
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      // Create an NFT contract instance
      const nftContract = new Contract(nftContractAddress, nftAbi, signer);

      // Approve marketplace to transfer NFT
      const approvalTx = await nftContract.approve(marketplaceAddress, tokenId);
      await approvalTx.wait();

    const owner = await nftContract.ownerOf(tokenId);
    if (owner.toLowerCase() === account.toLowerCase()) {
      toast.success("You own this token!", { theme: "dark" });
    } else {
      toast.info("You do not own this token.", { theme: "dark" });
    }
  };
  const listItem = async () => {
    if (
      !contract ||
      !nftContractAddress.trim() ||
      !tokenId.trim() ||
      !price.trim()
    )
      return;

    try {
      setListing(true);
      setError("");

      // List NFT on the marketplace
      const tx = await contract.listItem(
        nftContractAddress,
        tokenId,
        ethers.parseUnits(price)
      );
      await tx.wait();

      toast.success("Item listed successfully!", { theme: "dark" });
      setNftContractAddress("");
      setTokenId("");
      setPrice("");
      fetchListings();
    } catch (err) {
      setError(err.message);
      // toast.error(`${err.message}`, { theme: "dark" });
      console.error("Failed to list item:", err.message);
    } finally {
      setListing(false);
    }
  };

  const buyItem = async (itemId) => {
    try {
      setBuying(true);
      setError("");

      const listing = await contract.listings(itemId);
      const tx = await contract.buyItem(itemId, { value: listing.price });
      await tx.wait();

      toast.success("Item bought successfully!", { theme: "dark" });
      fetchListings();
    } catch (err) {
      setError(err.message);
      // toast.error(`${err.message}`, { theme: "dark" });
      console.error("Failed to buy item:", err.message);
    } finally {
      setBuying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl p-8">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Learning NFT Marketplace
          </h1>
          <p className="text-sm text-gray-600 mb-4">Connected: {account}</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label
              htmlFor="nftContractAddress"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              NFT Contract Address
            </label>
            <input
              type="text"
              id="nftContractAddress"
              value={nftContractAddress}
              onChange={(e) => setNftContractAddress(e.target.value)}
              placeholder="Enter NFT Contract Address"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={listing}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="tokenId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Token ID
            </label>
            <input
              type="text"
              id="tokenId"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              placeholder="Enter Token ID"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={listing}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Listing Price (ETH)
            </label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Price for the NFT (ETH)"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={listing}
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={listItem}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
              disabled={
                listing ||
                !nftContractAddress.trim() ||
                !tokenId.trim() ||
                !price.trim()
              }
            >
              {listing ? "Listing..." : "List Item"}
            </button>

            <button
              onClick={checkOwnership}
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
              disabled={!nftContractAddress.trim() || !tokenId.trim()}
            >
              Check Ownership
            </button>
          </div>
          <div className="mt-8 overflow-x-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
              Available Listings
            </h2>
            {listings.length === 0 ? (
              <p className="text-gray-600">No listings available.</p>
            ) : (
              <table className="min-w-full leading-normal shadow-md rounded-lg">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      NFT Contract
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Token ID
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Price (ETH)
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {listings.map((listing) => (
                    <tr key={listing.itemId} className="hover:bg-gray-100">
                      <td className="px-4 py-3 border-b border-gray-200 text-sm">
                        <p className="text-gray-900">{listing.nftContract}</p>
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200 text-sm">
                        <p className="text-gray-900">{listing.tokenId}</p>
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200 text-sm">
                        <p className="text-green-500 font-medium">
                          {ethers.formatEther(listing.price)}
                        </p>
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200 text-sm">
                        <button
                          onClick={() => buyItem(listing.itemId)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
                          disabled={buying}
                        >
                          {buying ? "Buying..." : "Buy Item"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marketplace;
