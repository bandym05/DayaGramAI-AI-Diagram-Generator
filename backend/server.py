from fastapi import FastAPI, Request
import requests
import os
from dotenv import load_dotenv
import uvicorn

# Load API key from .env file
load_dotenv()
DEEPSEEK_API_URL = "https://api.deepseek.com/v1/completions"  # Update if needed
API_KEY = os.getenv("DEEPSEEK_API_KEY")

app = FastAPI()

@app.post("/generate")
async def generate_diagram(request: Request):
    data = await request.json()
    prompt = data["prompt"]

    payload = {
        "model": "deepseek-coder",  # Ensure correct model name
        "messages": [{"role": "user", "content": f"Convert this to Mermaid.js: {prompt}"}]
    }

    headers = {"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"}
    response = requests.post(DEEPSEEK_API_URL, json=payload, headers=headers)

    if response.status_code == 200:
        mermaid_code = response.json()["choices"][0]["message"]["content"].strip()
        return {"mermaid_code": mermaid_code}
    else:
        return {"error": "Failed to get a response from DeepSeek"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=5000)
