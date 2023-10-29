import React, { useState, useEffect } from "react";
import { toUnits, useContract, useContractRead } from "@thirdweb-dev/react";
import { formatUnits } from "ethers/lib/utils";
import Contract_Address from "./addresses";

const PollutionReportsPage = () => {
  const [pollutionReports, setPollutionReports] = useState([]);
  const { contract } = useContract(Contract_Address);
  const sampleReport = {
    title: "Sample Pollution Report",
    description: "This is a sample pollution report for demonstration purposes.",
    imageHashes: ["your-ipfs-hash-for-sample-image"],
    reporter: "0xYourAddress", // Replace with the actual address
  };
  let { data, isLoading } = useContractRead(contract, "getPollutionReportsCount", []);
  
  const fetchMultipleData = async () => {
    try {
      if (!isLoading) {
        const count = Number(formatUnits(data, 0));

        const dataArray = [];

        for (let i = 0; i <= count-1; i++) {
          const reportData = await contract.call("getPollutionReport", [i]);
          dataArray.push(reportData);
        }

        console.log("Fetched data for multiple reports:", dataArray);
        setPollutionReports(dataArray);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Pollution Reports</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pollutionReports.map((report, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={`https://ipfs.io/ipfs/${report.imageHashes[0]}`}
                alt="Report"
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{report.title}</h2>
                <p className="text-gray-400">{report.description}</p>
                <div className="mt-4">
                  <p className="text-gray-500">
                    Reported by: {report.reporter}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PollutionReportsPage;
