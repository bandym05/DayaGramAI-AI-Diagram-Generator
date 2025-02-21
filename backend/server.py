from fastapi import FastAPI, Request
import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize Groq client
client = Groq(api_key=GROQ_API_KEY)

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "FlowchatAI Backend is Running!"}

@app.post("/generate")
async def generate_diagram(request: Request):
    data = await request.json()
    prompt = data["prompt"]

    # Query Groq API
    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": f"Convert this to Mermaid.js: {prompt}"}],
        temperature=0.7,
        max_tokens=512,
        top_p=1,
    )

    # Extract generated Mermaid.js code
    mermaid_code = completion.choices[0].message.content.strip()
    
    return {"mermaid_code": mermaid_code}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)
