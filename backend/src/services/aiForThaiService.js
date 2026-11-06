
export const alignEnglishThai = async (EN, TH) => {
  const response = await fetch(
    process.env.AIFORTHAI_WORD_ALIGNER_URL,
    {
      method: "POST",
      headers: {
        apikey: process.env.AIFORTHAI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ EN, TH }),
    }
  );

  if (!response.ok) {
    throw new Error(`AI FOR THAI Error: ${response.status}`);
  }

  return await response.json();
};
