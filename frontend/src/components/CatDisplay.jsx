import catIdle from "../assets/images/cat/cat-idle.png";
import catHappy from "../assets/images/cat/cat-happy.png";
import catSad from "../assets/images/cat/cat-sad.png";
import catEating from "../assets/images/cat/cat-eating.png";

function CatDisplay({ fedCount, mood }) {
  const catImages = {
    neutral: catIdle,
    happy: catHappy,
    sad: catSad,
    eating: catEating,
  };

  return (
    <section className="cat-display">
      <img
        src={catImages[mood] || catIdle}
        alt="Cat Character"
        className="cat-image"
      />

      <h2>
        {mood === "happy"
          ? "Yummy! Thank you!"
          : mood === "sad"
          ? "Try again!"
          : "I'm hungry!"}
      </h2>

      <p>Fish collected: {fedCount}</p>
    </section>
  );
}

export default CatDisplay;