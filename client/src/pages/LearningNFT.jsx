import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { storeContext } from "../context/storeContext";

const LearningNFT = () => {
  const [nftName, setNftName] = useState("");
  const [nftSymbol, setNftSymbol] = useState("");
  const [nftDescription, setNftDescription] = useState("");
  const [nftImage, setNftImage] = useState("");
  const [minting, setMinting] = useState(false);
  const[nftDataList, setnftDataList]=useState({})
  const { connectWallet, account, error, setError, getContractInstance } = useContext(storeContext);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initializeContract = async () => {
      if (!account) {
        await connectWallet();
      }
      const learningNFTContract = await getContractInstance("LearningNFT");
      setContract(learningNFTContract);
    };

    initializeContract();
  }, [connectWallet, account, getContractInstance]);

  const getNFTData = async (tokenId) => {
    if (!contract) return;
  
    try {
      const nftData = await contract.getNFTMetadata(tokenId);
      const structuredData = {
        name: nftData[0],
        symbol: nftData[1],
        description: nftData[2],
        image: nftData[3],
      };
  
      console.log("NFT Data:", structuredData);
      setnftDataList(structuredData);
      return structuredData;
    } catch (err) {
      console.log("Failed to fetch NFT data:", err.message);
    }
  };

  const mintNFT = async () => {
    if (!contract || !nftName.trim() || !nftSymbol.trim() || !nftDescription.trim() || !nftImage.trim()) return;

    try {
      setMinting(true);
      setError("");
      // Mint the NFT
      const tx = await contract.mintNFT(nftName, nftSymbol, nftDescription, nftImage);
      const receipt = await tx.wait();

    toast.success(`NFT Minted successfully!`, { theme: "dark" });
      setNftName("");
      setNftSymbol("");
      setNftDescription("");
      setNftImage("");

    } catch (err) {
      setError(err.message);
      // toast.error(`${err.message}`, { theme: "dark" });
      console.error("NFT minting failed:", err.message);
    } finally {
      setMinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative bg-white shadow-lg sm:rounded-3xl p-8">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Mint Your Achievements as NFTs</h1>
          <p className="text-sm text-gray-600 mb-4">Connected: {account}</p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="nftName" className="block text-gray-700 text-sm font-bold mb-2">NFT Name</label>
            <input
              type="text"
              id="nftName"
              value={nftName}
              onChange={(e) => setNftName(e.target.value)}
              placeholder="Enter NFT Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={minting}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nftSymbol" className="block text-gray-700 text-sm font-bold mb-2">NFT Symbol</label>
            <input
              type="text"
              id="nftSymbol"
              value={nftSymbol}
              onChange={(e) => setNftSymbol(e.target.value)}
              placeholder="Enter NFT Symbol"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={minting}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nftDescription" className="block text-gray-700 text-sm font-bold mb-2">NFT Description</label>
            <textarea
              id="nftDescription"
              value={nftDescription}
              onChange={(e) => setNftDescription(e.target.value)}
              placeholder="Enter NFT Description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={minting}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nftImage" className="block text-gray-700 text-sm font-bold mb-2">NFT Image URL</label>
            <input
              type="text"
              id="nftImage"
              value={nftImage}
              onChange={(e) => setNftImage(e.target.value)}
              placeholder="Enter NFT Image URL"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              disabled={minting}
            />
          </div>

          <button
            onClick={mintNFT}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-400"
            disabled={minting || !nftName.trim() || !nftSymbol.trim() || !nftDescription.trim() || !nftImage.trim()}
          >
            {minting ? "Minting..." : "Mint NFT"}
          </button> 
        </div>
      </div>

      {/* {nftDataList && (
            <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">My NFT Collection</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  <div key={nftDataList.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img src={nftDataList.image} alt={nftDataList.name} className="w-full h-52 object-cover" />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-900">{nftDataList.name} ({nftDataList.symbol})</h2>
                      <p className="text-sm text-gray-600 mt-2">{nftDataList.description}</p>
                    </div>
                  </div>
              </div>
          </div>
          )} */}
    </div>
  );
};

export default LearningNFT