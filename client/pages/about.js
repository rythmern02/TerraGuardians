import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-gradient-to-br from-purple-900 to-blue-900 min-h-screen p-8 text-white">
            <div className="max-w-screen-xl mx-auto">
                <h1 className="text-4xl font-bold mb-4">About TerraGuardians</h1>
            </div>

            {/* Mission & Vision */}
            <section className="bg-gray-900 py-16">
                <div className="max-w-screen-xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Our Mission & Vision</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="md:col-span-1">
                            <p className="text-xl text-opacity-90">
                                At TerraGuardians, our mission is to protect and preserve our planet. We aim to empower individuals and communities to take action against pollution, support cleanup initiatives, and work together for a cleaner and healthier environment.
                            </p>
                        </div>
                        <div className="md:col-span-1">
                            <p className="text-xl text-opacity-90">
                                Our vision is to create a global network of environmental stewards who actively report pollution, participate in cleanup projects, and collaborate for sustainable solutions. We envision a world where everyone can contribute to a cleaner and greener Earth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features & Why TerraGuardians */}
            <section className="bg-purple-900 py-16">
                <div className="max-w-screen-xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Our Features</h2>
                    <ul className="text-xl text-opacity-90 text-left">
                        <li>Effortless pollution reporting with user-friendly tools</li>
                        <li>Support for cleanup initiatives and fundraisers</li>
                        <li>Transparent and efficient use of blockchain technology</li>
                        <li>Rewards program to encourage eco-friendly actions</li>
                        <li>Global collaboration and partnerships for a bigger impact</li>
                    </ul>
                    <h2 className="text-3xl font-bold text-white mt-8 mb-6">Why TerraGuardians?</h2>
                    <p className="text-xl text-opacity-90">
                        TerraGuardians offers a unique platform that combines cutting-edge technology with environmental awareness. We make it easy for users to report pollution, engage in cleanup activities, and be part of a global community dedicated to preserving our planet.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
