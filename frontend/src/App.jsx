
import { useState, useCallback } from "react";

import CatCharacter from "./components/CatCharacter";
import QuestionCard from "./components/QuestionCard";
import LoadingScreen from "./components/LoadingScreen";

import { vocabulary } from "./data/vocabulary";

import "./App.css";

// สไตล์ปุ่มเล่นอีกครั้ง (ม่วงพาสเทล)
const playAgainStyle = {
  display: "block",
  width: "100%",
  maxWidth: "450px",
  margin: "24px auto 0",
  padding: "16px 24px",
  border: "2px solid #e4d9ff",
  borderRadius: "16px",
  background: "linear-gradient(135deg, #cdbdf7, #b9a3ee)",
  color: "#3b2a63",
  fontSize: "20px",
  fontWeight: "bold",
  letterSpacing: "0.3px",
  cursor: "pointer",
  boxShadow: "0 4px 14px rgba(185, 163, 238, 0.4)",
  transition: "all 0.15s ease",
};

function App() {
  // สถานะหน้า Loading
  const [isLoading, setIsLoading] = useState(true);

  // สถานะเกม
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState("question");
  const [score, setScore] = useState(0);

  // Callback ต้องคงที่ เพื่อไม่ให้ LoadingScreen โหลดซ้ำ
  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // แสดงหน้า Loading ก่อนเข้าเกม
  if (isLoading) {
    return (
      <LoadingScreen onComplete={handleLoadingComplete} />
    );
  }

  const currentVocabulary = vocabulary[currentIndex];

  // ตรวจสอบคำตอบ
  const handleAnswer = (isCorrect) => {
    if (phase !== "question") return;

    if (isCorrect) {
      setScore((prev) => prev + 1);
      setPhase("happy");
    } else {
      setPhase("sad");
    }
  };

  // เมื่อตอบผิด ให้กลับไปตอบคำถามเดิม
  const handleRetry = () => {
    setPhase("question");
  };

  // เมื่อกดให้อาหาร
  const handleFeed = () => {
    if (phase !== "happy") return;

    setPhase("feeding");

    // ให้น้องแมวกินอาหารก่อน 1.5 วินาที
    setTimeout(() => {
      if (currentIndex < vocabulary.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setPhase("question");
      } else {
        setPhase("result");
      }
    }, 1500);
  };

  // เริ่มเกมใหม่
  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setPhase("question");
  };

  // กำหนดอารมณ์ของแมว
  const catMood =
    phase === "happy" ? "happy" :
    phase === "sad" ? "sad" :
    phase === "feeding" ? "eating" :
    "idle";

  return (
    <main className="app">

      <header className="game-header">
        <h1>🐱 Cat Feeding Game</h1>
        <p>เรียนรู้คำศัพท์ภาษาอังกฤษไปกับน้องแมว</p>
      </header>

      <section className="game-content">

        <div className="cat-section">
          <CatCharacter mood={catMood} />
        </div>

        {phase !== "result" ? (
          <div className="quiz-section">

            <div className="game-progress">
              <span>
                ข้อ {currentIndex + 1} / {vocabulary.length}
              </span>

              <span>
                คะแนน {score}
              </span>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${
                    ((currentIndex + 1) / vocabulary.length) * 100
                  }%`
                }}
              />
            </div>

            <QuestionCard
              key={currentVocabulary.id}
              vocabulary={currentVocabulary}
              phase={phase}
              onAnswer={handleAnswer}
              onRetry={handleRetry}
            />

            {phase === "happy" && (
              <button
                className="feed-button"
                onClick={handleFeed}
              >
                🍗 ให้อาหารน้องแมว
              </button>
            )}

            {phase === "feeding" && (
              <div className="feeding-message">
                ❤️ น้องแมวกำลังกินอาหาร...
              </div>
            )}

          </div>
        ) : (
          <div className="result-card">
            <h2>🎉 เล่นจบแล้ว!</h2>

            <p>น้องแมวอิ่มแล้ว ขอบคุณที่ดูแลนะ</p>

            <div className="final-score">
              {score} / {vocabulary.length}
            </div>

            <p>
              {score === vocabulary.length
                ? "เก่งมาก! ตอบถูกทุกข้อเลย"
                : "เก่งมากที่พยายามเรียนรู้ ลองเล่นอีกครั้งนะ"}
            </p>

            <button
              className="play-again-button"
              onClick={handleRestart}
              style={playAgainStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background =
                  "linear-gradient(135deg, #d9ccff, #c4b0f5)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(185, 163, 238, 0.55)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  playAgainStyle.background;
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  playAgainStyle.boxShadow;
              }}
            >
              🔄 เล่นอีกครั้ง
            </button>
          </div>
        )}

      </section>
    </main>
  );
}

export default App;
