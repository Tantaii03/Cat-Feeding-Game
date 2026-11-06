
import "./CatCharacter.css";

import idleCat from "../assets/images/cat-idle.png";
import happyCat from "../assets/images/cat-happy.png";
import sadCat from "../assets/images/cat-sad.png";
import eatingCat from "../assets/images/cat-eating.png";

function CatCharacter({ mood = "idle" }) {
  const catImages = {
    idle: idleCat,
    happy: happyCat,
    sad: sadCat,
    eating: eatingCat,
  };

  const catMessages = {
    idle: "มาช่วยน้องแมวเรียนรู้กัน!",
    happy: "เย้! ตอบถูกแล้ว ขอบคุณนะ!",
    sad: "ไม่เป็นไรนะ ลองใหม่อีกครั้ง!",
    eating: "ง่ำ ๆ อร่อยจังเลย!",
  };

  return (
    <div className={`cat-character cat-${mood}`}>
      <img
        key={mood}
        src={catImages[mood]}
        alt={`Cat ${mood}`}
        className="cat-image"
      />

      <h3 className="cat-message">
        {catMessages[mood]}
      </h3>
    </div>
  );
}

export default CatCharacter;
