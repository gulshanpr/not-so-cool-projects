'use client'
import { connectWallet, getCurrentWalletConnected } from "./connectWallet";
import { useEffect, useState } from "react";
import PlusOne from "./../../PlusOne.json"
const ethers = require('ethers');

export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [walletStatus, setWalletStatus] = useState("Connect your Metamask wallet");
  const [currentStatus, setCurrentStatus] = useState("");

  console.log("");

  const connectButton = async () => {
    const walletResponse = await connectWallet();
    setWalletAddress(walletResponse.address);
    setWalletStatus(walletResponse.status);
  };

  const handlePlusOne = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Request access to the user's MetaMask account
        await window.ethereum.request({ method: 'eth_requestAccounts' });
  
        // Create a provider using the user's MetaMask account
        const provider = new ethers.BrowserProvider(window.ethereum);
  
        // Get the user's connected account address
        const [userAddress] = await provider.listAccounts();
        const contractABI = require("./../../PlusOne.json");
        const contractAbi = contractABI.abi;
  
        // Create a contract instance using the user's signer
        const signer = provider.getSigner();
        const contract = new ethers.Contract(address, contractAbi, signer);
  
        // Send the transaction to increase the value
        const tx = await contract.increase();
        console.log('Transaction hash:', tx.hash);
      } catch (error) {
        console.error('Error signing transaction with MetaMask:', error);
      }
    } else {
      console.log('Please install MetaMask to use this feature.');
    }
  };

  const handleMinusOne = async () => {
    const apiurl = process.env.NEXT_PUBLIC_API_URL;
    const provider = new ethers.JsonRpcProvider(apiurl);
    const address = '0x69D08EBE5E7158B866CB8bcF68567d968Dd2Da74';
    const contractABI = require("./../../PlusOne.json")
    const contractAbi = contractABI.abi;
    const privatekey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    const wallet = new ethers.Wallet(privatekey,provider);
    const contract = new ethers.Contract(address,contractAbi,wallet);

    contract.decrease().then((res) => {
      console.log(res.hash);
    });
  }


  const handleGetCurrentStatus = async () => {
    const apiurl = process.env.NEXT_PUBLIC_API_URL;
    const provider = new ethers.JsonRpcProvider(apiurl);
    const address = '0x69D08EBE5E7158B866CB8bcF68567d968Dd2Da74';
    const contractABI = require("./../../PlusOne.json")
    const contractAbi = contractABI.abi;
    const privatekey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    const wallet = new ethers.Wallet(privatekey,provider);
    const contract = new ethers.Contract(address,contractAbi,wallet);

    contract.getTheCurrentCount().then((res) => {
      setCurrentStatus(parseInt(res));
      console.log(parseInt(res));
    });
  }

  useEffect(() => {
    const fetchWallet = async () => {
      const alreadyConnected = await getCurrentWalletConnected();
      setWalletAddress(alreadyConnected.address);
      setWalletStatus(alreadyConnected.status);
    };

    fetchWallet();
    const current = async () => {
      await handleGetCurrentStatus();
    }
     current();

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setWalletStatus("Connected");
      } else {
        setWalletAddress("NULL");
        setWalletStatus("Try connecting it again");
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    } else {
      setWalletStatus("Install Metamask");
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, []);

  return (
    <div className="my-32 mx-96">
      <h1>title: Hi from my counter program DApp</h1>
      <button className="bg-black text-white p-2" onClick={connectButton}>
        {walletAddress ? walletStatus : "Connect plesase"}
      </button>
      <button className="bg-black text-white mx-10 p-2" onClick={handlePlusOne}>+1</button>
      <button className="bg-black text-white p-2" onClick={handleMinusOne}>-1</button>
      <p>{"connected account address: " + walletAddress}</p>
      <p>{"connection status: "+ walletStatus}</p>
      <button className="bg-black text-white p-2" onClick={handleGetCurrentStatus} >current count</button>
      <p>{"Current status is: " + currentStatus}</p>
    </div>
  );
}
