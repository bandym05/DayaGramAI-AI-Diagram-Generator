from fastapi import FastAPI, Request
import os
<<<<<<< HEAD
import re
from dotenv import load_dotenv
from groq import Groq
=======
from dotenv import load_dotenv
from groq import Groq

>>>>>>> 532b346a39379a0bdd81142fbb01086c5531f081
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

# Initialize Groq client
client = Groq(api_key=GROQ_API_KEY)

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
<<<<<<< HEAD
    allow_origins=["*"],  
=======
    allow_origins=["*"],  # Change this in production to a specific URL
>>>>>>> 532b346a39379a0bdd81142fbb01086c5531f081
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
<<<<<<< HEAD
    return {"message": "DayaGramAI Backend is Running!"}
=======
    return {"message": "FlowchatAI Backend is Running!"}
>>>>>>> 532b346a39379a0bdd81142fbb01086c5531f081

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
<<<<<<< HEAD
    response_text = completion.choices[0].message.content.strip()

    # Use regex to extract only the Mermaid.js code
    match = re.search(r"```mermaid(.*?)```", response_text, re.DOTALL)
    mermaid_code = match.group(1).strip() if match else "graph TD; A[Error] --> B[Invalid Response]"

=======
    mermaid_code = completion.choices[0].message.content.strip()
    
>>>>>>> 532b346a39379a0bdd81142fbb01086c5531f081
    return {"mermaid_code": mermaid_code}

if __name__ == "__main__":
    import uvicorn
<<<<<<< HEAD
    uvicorn.run(app, host="127.0.0.1", port=8000)
=======
    uvicorn.run(app, host="127.0.0.1", port=5000)
>>>>>>> 532b346a39379a0bdd81142fbb01086c5531f081
