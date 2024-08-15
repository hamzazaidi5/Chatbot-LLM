from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from langchain_community.llms import Ollama
from pydantic import BaseModel
from typing import List, Literal, Optional

from models import SessionLocal, Conversation, Base

app = FastAPI()

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Define data model for incoming requests
class QueryRequest(BaseModel):
    query: str
    conversation_id: Optional[int] = None  # Make conversation_id optional and an integer
    model_name: Literal["llama2", "mistral"]

# Data model for API response to list conversations
class ConversationResponse(BaseModel):
    conversation_id: int
    messages: List[dict]

# Start or continue a conversation
@app.post("/query/")
def create_conversation(request: QueryRequest, db: Session = Depends(get_db)):
    query = request.query
    model_name = request.model_name

    # Determine conversation_id
    if request.conversation_id is None:
        # Get the maximum conversation_id from the database and increment it
        max_id = db.query(Conversation).order_by(Conversation.conversation_id.desc()).first()
        # Convert max_id.conversation_id to int if it's a string
        conversation_id = (int(max_id.conversation_id) + 1) if max_id else 1  # Start from 1 if no conversations exist
    else:
        conversation_id = request.conversation_id

    # Ensure conversation_id is an integer
    conversation_id = int(conversation_id)

    # Retrieve the conversation context from the database if it exists
    conversation = db.query(Conversation).filter(Conversation.conversation_id == conversation_id).first()
    
    if conversation:
        messages = eval(conversation.messages)  # Convert the stored string back to a list
    else:
        messages = []

    # Add the new user query to the conversation
    messages.append({"role": "user", "content": query})

    llm = Ollama(model=model_name, num_predict=50, system="Give short answers as much as possible.", base_url="http://0.0.0.0:11434")
    
    response = llm.invoke(messages)
    messages.append({"role": "assistant", "content": response.strip()})
    
    # Update or create the conversation in the database
    if conversation:
        conversation.messages = str(messages)
    else:
        new_conversation = Conversation(conversation_id=conversation_id, messages=str(messages))
        db.add(new_conversation)
    
    db.commit()
    db.refresh(new_conversation if conversation is None else conversation)
    
    return {"response": response.strip(), "conversation_id": conversation_id}


# List all conversations
@app.get("/conversations/", response_model=List[ConversationResponse])
async def list_conversations(db: Session = Depends(get_db)):
    # Retrieve all conversations from the database
    conversations = db.query(Conversation).all()
    
    # Structure the response
    conversation_list = []
    for conv in conversations:
        conversation_data = {
            "conversation_id": conv.conversation_id,
            "messages": eval(conv.messages)  # Convert the stored string back to a list of dictionaries
        }
        conversation_list.append(conversation_data)
    
    return conversation_list

# Get a specific conversation by ID
@app.get("/conversations/{conversation_id}", response_model=ConversationResponse)
def get_conversation(conversation_id: int, db: Session = Depends(get_db)):
    conversation = db.query(Conversation).filter(Conversation.conversation_id == conversation_id).first()
    if conversation is None:
        raise HTTPException(status_code=404, detail="Conversation not found")
    return {
        "conversation_id": conversation.conversation_id,
        "messages": eval(conversation.messages)  # Convert the stored string back to a list of dictionaries
    }

@app.get("/")
async def root():
    return {"message": "API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
