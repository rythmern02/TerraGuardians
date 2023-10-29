import Link from "next/link";
import React, { useEffect } from "react";

const Dashboard = () => {
  useEffect(() => {
    // Apply the 'index-page' class to the body element
    document.body.classList.add("dashboard-page");

    // Clean up when the component unmounts
    return () => {
      document.body.classList.remove("dashboard-page");
    };
  }, []);

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Dashboard</h1>

        <div className="grid grid-cols-2 gap-4">
          <div className="dash1 w-full py-20 px-6 h-max text-center cursor-pointer relative">
            <h2 className="text-2xl font-bold">Section 1</h2>
            <div className="bg-cover bg-center absolute  top-0 left-0 right-0 bottom-0" ></div>
          </div>
          <div className="dash2 w-full py-20 px-6 cursor-pointer text-center relative">
            <h2 className="text-2xl font-bold">Section 2</h2>
            <div className="bg-cover bg-center absolute top-0 left-0 right-0 bottom-0" ></div>
          </div>
          <div className="dash3 w-full py-20 px-6 cursor-pointer text-center relative">
            <h2 className="text-2xl font-bold">Section 3</h2>
            <div className="bg-cover bg-center absolute top-0 left-0 right-0 bottom-0" ></div>
          </div>
          <div className="dash4 w-full py-20 px-6 cursor-pointer text-center relative">
            <h2 className="text-2xl font-bold">Section 4</h2>
            <div className="bg-cover bg-center absolute top-0 left-0 right-0 bottom-0" ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
