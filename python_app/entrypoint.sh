#!/bin/bash

# # Start the Ollama container if it's not running
# if [ ! "$(docker ps -q -f name=ollama)" ]; then
#     docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama
# fi

# # Wait for the Ollama service to be ready
# sleep 10

# # Pull the models
# docker exec -it ollama ollama pull llama2
# docker exec -it ollama ollama pull mistral

# Start the FastAPI application
uvicorn api:app --host 0.0.0.0 --port 8000
