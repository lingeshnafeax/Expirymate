import { gemini } from "@/lib/gemini";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const imageUrl = "https://picsum.photos/200/300";
    const imageResponse = await fetch(imageUrl);
    const imageArrayBuffer = await imageResponse.arrayBuffer();
    const base64ImageData = Buffer.from(imageArrayBuffer).toString("base64");
    const response = await gemini.models.generateContent({
      model: "gemini-2.0-flash",
      contents: {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64ImageData,
        },
      },
      config: {
        systemInstruction:
          "You need to scan the file that is given to you and extract many informations from the file. The required informations are type of file, Expiry date in the file and others are optional",
      },
    });
    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error", error: err }, { status: 500 });
  }
};
