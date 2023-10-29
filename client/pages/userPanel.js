import React, { useEffect, useState } from 'react';
import { useAddress, useContract } from "@thirdweb-dev/react";
import Contract_Address from './addresses';

const UserPanel = () => {
  const address = useAddress();
  if (!address) {
    return (<div><h1>Connect Your Wallet First...</h1></div>);
  }

  const { contract } = useContract(Contract_Address);

  const [userData, setUserData] = useState({
    wallet: '',
    balance: 0,
    exists: false
  });
  const [reportedPollutions, setReportedPollutions] = useState([]);
  const [initiatives, setInitiatives] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await contract.call("users", [address]);
        const wallet = address || "";
        const balance = data[1];
        const exists = data[2];

        setUserData({ wallet, balance, exists });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoading(false);
      }
    };

    const getReportedPollutions = async () => {
      try {
        const data = await contract.call("getReportsByUser", [address]);
        setReportedPollutions(data);
      } catch (error) {
        console.error("Error fetching reported pollutions:", error);
      }
    };
    const getInitiatives = async () => {
      try {
        const data = await contract.call("getInitiativesByUser", [address]);
        setInitiatives(data);
      } catch (error) {
        console.error("Error fetching reported pollutions:", error);
      }
    };

    fetchData();
    getReportedPollutions();
    getInitiatives();
  }, [contract, address]);

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-my-blue h-screen text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-semibold mb-4">User Panel</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-my-blue p-6 rounded-lg shadow-lg mb-6">
            <h2 className="text-xl font-semibold mb-2">User Details</h2>
            <p>Address: {userData.wallet}</p>
            <p>Token Balance: {Number(userData.balance)}</p>
          </div>

          <div className="bg-my-blue p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Reported Pollutions</h2>
            <ul className="list-disc ml-6">
              {reportedPollutions.map((pollution, index) => (
                <li key={index}>
                  <div>
                    <h3 className="text-lg font-semibold">{pollution.title}</h3>
                    <p>{pollution.description}</p>
                    <img src={`https://ipfs.io/ipfs/${pollution.imageHashes[0]}`} alt="Pollution" className="mt-2 rounded-lg" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-my-blue p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-2"> Clean Up Initiatives</h2>
            <ul className="list-disc ml-6">
              {initiatives.map((initiative, index) => (
                <li key={index}>
                  <div>
                    <h3 className="text-lg font-semibold">{initiative.title}</h3>
                    <p>{initiative.description}</p>
                    <img src={`https://ipfs.io/ipfs/${initiative.imageHashes[0]}`} alt="Pollution" className="mt-2 rounded-lg" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
