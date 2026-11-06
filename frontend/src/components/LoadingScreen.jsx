
import { useEffect, useState } from "react";

import loadingCat from "../assets/images/loading-cat.jpg";
import catIdle from "../assets/images/cat-idle.png";
import catHappy from "../assets/images/cat-happy.png";
import catSad from "../assets/images/cat-sad.png";
import catEating from "../assets/images/cat-eating.png";

import "./LoadingScreen.css";

const gameAssets = [
  loadingCat,
  catIdle,
  catHappy,
  catSad,
  catEating,
];

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const minimumLoadingTime = 3000;

    let loadedCount = 0;
    let cancelled = false;

    gameAssets.forEach((src) => {
      const img = new Image();

      const finishLoading = () => {
        if (cancelled) return;

        loadedCount++;

        const percent = Math.round(
          (loadedCount / gameAssets.length) * 100
        );

        setProgress(percent);

        if (loadedCount === gameAssets.length) {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(
            0,
            minimumLoadingTime - elapsedTime
          );

          setTimeout(() => {
            if (!cancelled) {
              onComplete();
            }
          }, remainingTime);
        }
      };

      img.onload = finishLoading;
      img.onerror = finishLoading;
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  return (
    <div className="loading-screen">
      <img
        src={loadingCat}
        alt="Cat Feeding Game"
        className="loading-image"
      />

      <div className="loading-progress">
        <div className="loading-text">
          <span>กำลังเตรียมเกม...</span>
          <span>{progress}%</span>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
