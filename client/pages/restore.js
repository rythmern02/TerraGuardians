import React, { useState, useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";

const LiveTracker = () => {
  const [garbageDetected, setGarbageDetected] = useState(false);
  const screenVideoRef = useRef(null);
  const detectionVideoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Screen sharing video feed
    const startScreenCapture = async () => {
      if (navigator.mediaDevices.getDisplayMedia) {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });

        if (screenVideoRef.current) {
          screenVideoRef.current.srcObject = stream;
        }
      } else {
        console.log('getDisplayMedia API not available');
      }
    };

    startScreenCapture();

    // Garbage detection on the selected screen
    const loadModelAndDetect = async () => {
      await tf.ready();

      const model = await cocossd.load();
      const videoElement = detectionVideoRef.current;
      const canvas = canvasRef.current;

      videoElement.srcObject = screenVideoRef.current.srcObject;

      videoElement.addEventListener("loadedmetadata", () => {
        const processFrame = async () => {
          const image = tf.browser.fromPixels(videoElement);
          const predictions = await model.detect(image);

          const context = canvas.getContext("2d");
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          context.drawImage(videoElement, 0, 0);

          predictions.forEach((prediction) => {
            const [x, y, width, height] = prediction.bbox;

            // Filter objects by class names (e.g., bottle, cup)
            const classNames = [
              "bottle",
              "person",
              "cup",
              "fork",
              "knife",
              "spoon",
              "bowl",
              "banana",
              "apple",
            ];

            if (classNames.includes(prediction.class)) {
              context.beginPath();
              context.rect(x, y, width, height);
              context.lineWidth = 2;
              context.strokeStyle = "red";
              context.fillStyle = "red";
              context.stroke();
              context.fillText(
                `${prediction.class} (${Math.round(prediction.score * 100)}%)`,
                x,
                y > 10 ? y - 5 : 10
              );

              // Check if any of the detected objects match the criteria
              if (classNames.includes(prediction.class)) {
                setGarbageDetected(true);
                console.log("the classname is: ", prediction.class)
              }
            }
          });

          requestAnimationFrame(processFrame);
        };

        requestAnimationFrame(processFrame);
      });
    };

    loadModelAndDetect();
  }, []);

  return (
    <div>
      <h1>Live Garbage Detection on Screen Share</h1>
      <div>
        {garbageDetected ? (
          <p>Garbage Detected!</p>
        ) : (
          <p>No Garbage Detected</p>
        )}
      </div>
      <video
        ref={screenVideoRef}
        controls
        autoPlay
        muted
        className="w-64 h-48"
      />
      <video
        ref={detectionVideoRef}
        style={{ display: "" }}
        className="w-64 h-48"
      />
      <canvas
        ref={canvasRef}
        style={{ display: "" }}
        className="w-full h-auto"
      />
    </div>
  );
};

export default LiveTracker;
