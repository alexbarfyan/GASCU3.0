export default async function handler(req, res) {
  try {
    const { message } = req.body;
    
    // Debugging: Print to Vercel Logs to prove the function ran
    console.log("Function started. Message received:", message);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }),
    });

    const data = await response.json();
    console.log("OpenAI responded"); // Check logs for this

    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Backend Crash:", error); // This will show in Vercel Logs
    res.status(500).json({ error: error.message });
  }
}
