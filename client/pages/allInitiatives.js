import React, { useState, useEffect } from "react";
import {
  Web3Button,
  useContract,
  useContractRead,
  toUnits,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { formatUnits } from "ethers/lib/utils";
import {Contract_Address} from './addresses';

// Sample data for initiatives (you can replace this with your actual data)
const sampleInitiatives = [
  {
    id: 1,
    description: "Clean up the riverbank near Main Street",
    fundingGoal: "1000 ETH",
    organizer: "John Doe",
    image: "image1.jpg", // Replace with image URL
  },
  {
    id: 2,
    description: "Beautify the park near Oak Avenue",
    fundingGoal: "750 ETH",
    organizer: "Jane Smith",
    image: "image2.jpg", // Replace with image URL
  },
  // Add more initiatives as needed
];

const AllInitiatives = () => {
  // State to hold the list of initiatives
  const [initiatives, setInitiatives] = useState([]);
  const { contract } = useContract(
    '0xf6dB913a567dB9296424013a4119987141161873'
  );
  let { data, isLoading } = useContractRead(
    contract,
    "getCleanupInitiativesCount",
    []
  );
  console.log()

  const fetchMultipleData = async () => {
    try {
      if (!isLoading) {
        const count = Number(formatUnits(data, 0));

        const dataArray = [];

        for (let i = 0; i <= count - 1; i++) {
          const reportData = await contract.call("getCleanupInitiative", [i]);
          dataArray.push(reportData);
        }

        console.log("Fetched data for multiple reports:", dataArray);
        setInitiatives(dataArray);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [donationAmount, setDonationAmount] = useState(0);

  const handleDonationAmount = (e) => {
    setDonationAmount(e.target.value);
  };

  useEffect(() => {
    if (!isLoading) {
      fetchMultipleData();
    }
  }, [isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-br from-purple-900 to-blue-900 min-h-screen p-8 text-white">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">All Initiatives</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {initiatives.map((initiative, index) => (
            <div
              key={index}
              className="bg-purple-700 p-4 w-min  rounded-lg hover:shadow-lg cursor-pointer"
            >
              <img
                src={`https://ipfs.io/ipfs/${initiative.imageHashes[0]}`}
                alt="Initiative"
                className="mb-4 rounded"
              />
              <h2 className="text-xl font-semibold">
                {initiative.description}
              </h2>
              <p>Organizer: {initiative.organizer}</p>
              <p>Funding Goal: {String(initiative.fundingGoal)} ETH</p>
              <Web3Button
                className="bg-blue-500 m-4 text-white rounded-full px-4 py-2 mt-2 hover:bg-blue-700 transition duration-300"
                contractAddress={Contract_Address}
                action={(contract) => {
                  contract.call("upvoteInitiative", [index]);
                }}
              >
                upvoteInitiative
              </Web3Button>

              {/* Donate Button */}
              <Web3Button
                className="bg-green-500 m-4 text-white rounded-full px-4 py-2 mt-2 hover:bg-green-700 transition duration-300"
                contractAddress={Contract_Address}
                action={(contract) => {
                  const val = ethers.utils.parseEther(String(donationAmount));
                  contract.call("donate", [index], { value: val });
                }}
              >
                Donate
              </Web3Button>
              <input
                type="number"
                value={donationAmount}
                onChange={handleDonationAmount}
                placeholder="Enter amount in ETH"
                className="w-full p-2 bg-gray-200 text-black rounded"
              />

              {/* Join Button */}
              <button
                className="bg-purple-500 m-4 text-white rounded-full px-4 py-2 mt-2 hover:bg-purple-700 transition duration-300"
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllInitiatives;
