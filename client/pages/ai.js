// pages/index.js
import React, { useState } from 'react';
import WasteDetection from '../components/wasteDetection';

const Home = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleVideoUpload = (acceptedFiles) => {
    // Handle video upload (e.g., save to state or server)
    const videoFile = acceptedFiles[0];
    setVideoUrl(URL.createObjectURL(videoFile));
  };

  return (
    <div>
      <h1>Waste Detection in Videos</h1>
      <input type="file" accept="video/*" onChange={(e) => handleVideoUpload(e.target.files)} />
      {videoUrl && <WasteDetection videoUrl={videoUrl} />}
    </div>
  );
};

export default Home;
