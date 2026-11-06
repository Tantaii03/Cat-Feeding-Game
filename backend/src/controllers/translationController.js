import { alignEnglishThai } from "../services/aiForThaiService.js";

export const alignWords = async (req, res) => {
  try {
    const { EN, TH } = req.body;

    if (!EN || !TH) {
      return res.status(400).json({
        success: false,
        message: "กรุณาระบุข้อความภาษาอังกฤษและภาษาไทย",
      });
    }

    const result = await alignEnglishThai(EN, TH);

    res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    console.error("Translation API Error:", error.message);

    res.status(500).json({
      success: false,
      message: "ไม่สามารถเชื่อมต่อ AI FOR THAI ได้",
    });
  }
};