import React, { useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";

const WasteDetection = ({ videoUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const loadModelAndDetect = async () => {
      await tf.ready();

      const model = await cocossd.load();
      const videoElement = document.getElementById("video-element");
      const canvas = canvasRef.current;

      videoElement.src = videoUrl;

      // Listen for the "loadedmetadata" event to ensure video dimensions are available
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
            ]; // Add other class names as needed
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

              // // Log detection information to the console
              // console.log(`Class: ${prediction.class}`);
              // console.log(`Score: ${Math.round(prediction.score * 100)}%`);
              // console.log("Bounding Box:", prediction.bbox);
            }
          });

          requestAnimationFrame(processFrame);
        };

        requestAnimationFrame(processFrame);
      });
    };

    loadModelAndDetect();
  }, [videoUrl]);

  return (
    <div>
      <video id="video-element" controls autoPlay muted className="w-64 h-48" />
      <canvas
        ref={canvasRef}
        style={{ display: "" }}
        className="w-full h-auto"
      />
    </div>
  );
};

export default WasteDetection;
