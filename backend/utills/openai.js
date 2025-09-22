import "dotenv/config";


 const API_KEY=process.env.API_KEY;

 const openAIResponse = async(messsage)=>{
    const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text:messsage }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

     return data.candidates[0].content.parts[0].text;
   
}



 export default openAIResponse;