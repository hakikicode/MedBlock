import React, { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
import { ethers } from "ethers";

const clientId = "BA4Mk1w0atrBh1zUU2GdFkmQ0ttl7egTGqSqq4m1nFZSuRls7WDVFlVam67_eU0fO-FAw0cSYkut-oWURbaKt1A"; // You can find this on the Web3Auth Dashboard

const Web3AuthComponent = () => {
  const [web3auth, setWeb3auth] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId,
          chainConfig: {
            chainNamespace: "eip155",
            chainId: "0xaa36a7", // Ethereum Mainnet
            rpcTarget: "https://sepolia.infura.io/v3/3de1dfa83d77414f9e271ade5ca4f5d5", // RPC URL, replace with your own Infura Project ID
          },
        });

        await web3authInstance.initModal(); // Initialize modal for Web3Auth
        setWeb3auth(web3authInstance);
      } catch (error) {
        console.error("Web3Auth initialization error:", error);
      }
    };

    initWeb3Auth();
  }, []);

  const login = async () => {
    if (!web3auth) return;

    try {
      const provider = await web3auth.connect(); // Login and get the provider
      setProvider(provider);

      const web3Provider = new ethers.providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      const publicAddress = await signer.getAddress(); // Fetch the public address
      setUserAddress(publicAddress);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Web3Auth Email Login</h1>
      <button onClick={login} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Login with Email
      </button>
      {userAddress && (
        <div style={{ marginTop: "20px" }}>
          <h3>Public Address:</h3>
          <p>{userAddress}</p>
        </div>
      )}
    </div>
  );
};

export default Web3AuthComponent;
