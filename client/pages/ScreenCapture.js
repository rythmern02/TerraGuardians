import React, { useEffect, useRef, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocossd from '@tensorflow-models/coco-ssd';

function ScreenCapture() {
  const videoRef = useRef(null);
  const aiCanvasRef = useRef(null);

  const [detectedObjects, setDetectedObjects] = useState([]);

  const handleObjectDetection = (objectName, x, y, width, height) => {
    console.log(`Detected Object: ${objectName}`);
    if (objectName === 'bottle') {
      // Capture and save the screenshot
      captureScreenshot(x, y, width, height);
    }
    // You can perform any additional actions here.
  };

  const captureScreenshot = (x, y, width, height) => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    context.drawImage(video, x, y, width, height, 0, 0, width, height);

    // Convert the screenshot to a data URL
    const screenshotDataUrl = canvas.toDataURL('image/png');

    // You can save the screenshot data URL or perform further actions here.
    // For saving it to a server or local storage, you would need appropriate code.
    console.log('Screenshot captured:', screenshotDataUrl);
  };

  useEffect(() => {
    if (navigator.mediaDevices.getDisplayMedia) {
      navigator.mediaDevices.getDisplayMedia({ video: true })
        .then(stream => {
          const video = videoRef.current;
          video.srcObject = stream;
          const aiCanvas = aiCanvasRef.current;

          video.addEventListener('loadedmetadata', () => {
            const loadModelAndDetect = async () => {
              await tf.ready();
              const model = await cocossd.load();

              setInterval(() => {
                const processFrame = async () => {
                  const image = tf.browser.fromPixels(video);
                  const predictions = await model.detect(image);

                  const aiContext = aiCanvas.getContext('2d');

                  aiCanvas.width = video.videoWidth;
                  aiCanvas.height = video.videoHeight;

                  // Clear detected objects
                  aiContext.clearRect(0, 0, aiCanvas.width, aiCanvas.height);
                  setDetectedObjects([]);

                  predictions.forEach((prediction) => {
                    const [x, y, width, height] = prediction.bbox;

                    // Filter objects by class names (e.g., bottle, cup)
                    const classNames = [
                      'bottle',
                      'cup',
                      'fork',
                      'knife',
                      'spoon',
                      'bowl',
                      'banana',
                      'apple',
                    ];

                    if (classNames.includes(prediction.class)) {
                      aiContext.beginPath();
                      aiContext.rect(x, y, width, height);
                      aiContext.lineWidth = 2;
                      aiContext.strokeStyle = 'red';
                      aiContext.fillStyle = 'red';
                      aiContext.stroke();
                      aiContext.fillText(
                        `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
                        x,
                        y > 10 ? y - 5 : 10
                      );

                      // Log detection information to the console
                      console.log(`Class: ${prediction.class}`);
                      console.log(`Score: ${Math.round(prediction.score * 100)}%`);
                      console.log('Bounding Box:', prediction.bbox);

                      // Store the detected object in state
                      setDetectedObjects((prevObjects) => [...prevObjects, prediction.class]);

                      // Call the handleObjectDetection function
                      handleObjectDetection(prediction.class, x, y, width, height);
                    }
                  });
                };

                processFrame();
              }, 10000);
            };

            loadModelAndDetect();
          });
        })
        .catch(err => console.error('Error: ' + err));
    } else {
      console.log('getDisplayMedia API not available');
    }
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <video ref={videoRef} autoPlay style={{ width: '100%' }} />
      <canvas ref={aiCanvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      <div>
        <p>Detected Objects: {detectedObjects.join(', ')}</p>
      </div>
    </div>
  );
}

export default ScreenCapture;
