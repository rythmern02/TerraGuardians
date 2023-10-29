import { ConnectWallet } from '@thirdweb-dev/react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className=" p-4 box-border shadow-md border border-gray-600">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl text-white font-semibold">TerraGuardians</div>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-gray-400 transition">Home</Link>
          <Link href="/allInitiatives" className="text-white hover:text-gray-400 transition">Initiatives</Link>
          <Link href="/allReports" className="text-white hover:text-gray-400 transition">Reports</Link>
          <Link href="/dashboard" className="text-white hover:text-gray-400 transition">DashBoard</Link>
          <Link href="/userPanel" className="text-white hover:text-gray-400 transition">UserPanel</Link>
          <Link href="/about" className="text-white hover:text-gray-400 transition">About</Link>
          <ConnectWallet theme="dark" modalSize="wide" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
