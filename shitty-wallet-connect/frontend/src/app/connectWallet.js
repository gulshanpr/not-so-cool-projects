export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        return {
          status: "Connected",
          address: addressArray[0]
        };
      } catch (err) {
        console.error("Error connecting to wallet: ", err.message);
        return {
          status: "Error connecting, try again",
          address: "NULL"
        };
      }
    } else {
      console.error("Metamask is not installed");
      return {
        status: "Metamask is not installed",
        address: "NULL"
      };
    }
  };
  
  export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "Connected",
          };
        } else {
          return {
            address: "NULL",
            status: "Try connecting it again",
          };
        }
      } catch (err) {
        return {
          address: "NULL",
          status: "Error connecting"
        };
      }
    } else {
      return {
        address: "NULL",
        status: "Install Metamask"
      };
    }
  };
  