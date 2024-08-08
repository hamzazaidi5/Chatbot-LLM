#!/bin/bash

# Start the Ollama container
docker run -d -v ollama:/root/.ollama -p 11434:11434 --name ollama ollama/ollama

# Pull the llama2 model
docker exec -it ollama ollama pull llama2

# Pull the mistral model
docker exec -it ollama ollama pull mistral

# Navigate to the python_app directory
cd python_app || { echo "Directory python_app not found"; exit 1; }

# Build and run the Dockerfile in the python_app directory
docker build -t my_fastapi_app .  
docker run -d -p 8000:8000 my_fastapi_app 

# Navigate to the nodejs_app directory
cd ../nodejs-api|| { echo "Directory nodejs_app not found"; exit 1; }

# Build and run the Dockerfile in the nodejs_app directory
docker build -t my_nodejs_app .  # Adjust the image name as needed
docker run -d -p 3000:3000 my_nodejs_app  # Adjust ports as necessary