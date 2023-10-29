import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const address = useAddress();
  useEffect(() => {
    // Apply the 'index-page' class to the body element
    document.body.classList.add('index-page');

    // Clean up when the component unmounts
    return () => {
      document.body.classList.remove('index-page');
    };
  }, []);

  return (
    <div className="h-screen">
      <div className="flex h-full">
        {/* Right Side: Text and Button */}
        <div className="w-1/2 flex flex-col items-center justify-center text-center p-8">
          <div className="mb-8">
            <div className="text-4xl font-semibold text-white">
            <h3>Welcome to</h3>
            </div>
            <h2 className="text-4xl font-bold text-white">
              <span className="text-green-500">Terra</span>Guardians
            </h2>
          </div>
          <Link href="/dashboard">
            <button className="block text-white bg-black text-2xl shadow-blue-900 hover:shadow-white font-bold p-4 px-10 border-spacing-1 shadow-md rounded-lg">
              Connect Wallet
            </button>
          </Link>
        </div>

        {/* Left Side: Image */}
        <div className="w-1/2">
          <Image
            src="/hell.svg"
            alt="Homepage image"
            width={600}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
