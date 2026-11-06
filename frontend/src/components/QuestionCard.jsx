import { useState } from "react";
import "./QuestionCard.css";

function QuestionCard({ vocabulary, phase, onAnswer, onRetry }) {
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const handleSubmit = () => {
    if (!selectedAnswer || phase !== "question") return;

    onAnswer(selectedAnswer === vocabulary.translation);
  };

  const handleRetry = () => {
    setSelectedAnswer("");
    onRetry();
  };

  return (
    <div className="question-card">
      <p className="question-label">เลือกความหมายภาษาไทยให้ถูกต้อง</p>

      <h2 className="vocabulary-word">{vocabulary.word}</h2>

      <div className="vocabulary-emoji">{vocabulary.emoji}</div>

      <div className="answer-options">
        {vocabulary.options.map((option) => (
          <button
            key={option}
            className={`answer-option ${
              selectedAnswer === option ? "selected" : ""
            }`}
            onClick={() => setSelectedAnswer(option)}
            disabled={phase !== "question"}
          >
            {option}
          </button>
        ))}
      </div>

      {phase === "question" && (
        <button
          className="submit-button"
          disabled={!selectedAnswer}
          onClick={handleSubmit}
        >
          ส่งคำตอบ
        </button>
      )}

      {phase === "happy" && (
        <div className="answer-feedback correct">เก่งมาก! ตอบถูกแล้ว 🎉</div>
      )}

      {phase === "sad" && (
        <div className="retry-section">
          <div className="answer-feedback incorrect">
            ยังไม่ถูกนะ ลองอีกครั้งได้เลย ❤️
          </div>

          <button
            className="retry-button"
            onClick={handleRetry}
            style={{
              display: "block",
              width: "100%",
              marginTop: "12px",
              padding: "16px 24px",
              border: "none",
              borderRadius: "14px",
              background: "#ffad33",
              color: "#241a10",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow: "0 4px 14px rgba(255, 173, 51, 0.35)",
            }}
          >
            ลองอีกครั้ง
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;