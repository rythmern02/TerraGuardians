import React, { useState, useRef } from "react";
import LocationPicker from "../components/locationPicker";
import { Web3Storage } from "web3.storage";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractWrite,
} from "@thirdweb-dev/react";
import Contract_Address from "./addresses";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDczM0NDMGY1MWE0RmI2MTAzOGU0MmZkMDc2NjU0QTJhZGU5ODFhN0QiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTMyMzY0NjA2ODksIm5hbWUiOiJhc3BzIn0.eaDAzQl6fcgDRnZhqtkj-DUM6ZMXeferFhe-X6S5RhU"; // Replace with your Web3.Storage token
const client = new Web3Storage({ token });

const PollutionReporting = () => {
  const contract = useContract(Contract_Address);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const imageInputRef = useRef(null);

  const address = useAddress();
  if (!address) {
    return <h1>Connect Your Wallet First</h1>;
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddImages = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    setImages([...images, ...Array.from(e.target.files)]);
  };

  const uploadFilesToIpfs = async (files) => {
    const hashes = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        if (!file) {
          alert("Upload a File");
        } else {
          const cid = await client.put([file]);
          const url = `https://ipfs.io/ipfs/${cid}/${file.name}`;
          const ipfsHash = `${cid}/${file.name}`;
          hashes.push(ipfsHash);
          console.info("Uploaded to IPFS:", ipfsHash);
        }
      } catch (error) {
        console.error("Error uploading file to IPFS:", error);
      }
    }

    return hashes;
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 to-blue-900 min-h-screen p-8 text-white">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Report Pollution</h1>

        <div className="bg-purple-700 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold">Title</h2>
          <input
            className="w-full p-2 bg-gray-200 text-black rounded"
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Title of the pollution..."
          />
        </div>
        <div className="bg-purple-700 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold">Address and Description</h2>
          <textarea
            className="w-full h-32 p-2 bg-gray-200 text-black rounded"
            placeholder="Describe the pollution..."
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>

        <div className="bg-purple-700 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold">Locate Pollution</h2>
          <LocationPicker
            latitude={latitude}
            longitude={longitude}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
        </div>
        <h3>
          The latitude is {latitude} and the longitude is {longitude}
        </h3>

        <div className="bg-purple-700 p-4 rounded-lg mb-4">
          <h2 className="text-xl font-semibold mb-2 mt-4 text-gray-800">
            Upload Images
          </h2>
          <button
            type="button"
            onClick={handleAddImages}
            className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition duration-300"
          >
            Choose Images
          </button>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            required
            className="w-full p-2 border rounded-md mt-2 hidden"
            ref={imageInputRef}
          />
          {images.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-2 mt-4 text-gray-800">
                Selected Images
              </h3>
              <ul className="list-disc ml-4">
                {images.map((image, index) => (
                  <li key={index}>{image.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <Web3Button
          contractAddress={Contract_Address}
          action={async (contract) => {
            const imageHashes = await uploadFilesToIpfs(images);
            console.log("images succesfully uploaded")
            try {
              const data = await contract.call("reportPollution", [
                title,
                description,
                imageHashes,
                String(longitude),
                String(latitude),
              ]);
              console.info("contract call success", data);
            } catch (err) {
              console.error("contract call failure", err);
            }
          }}
        >
          Report Pollution
        </Web3Button>
      </div>
    </div>
  );
};

export default PollutionReporting;
