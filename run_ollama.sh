#!/bin/bash

echo "Starting Ollama server..."
ollama serve &

echo "Waiting for Ollama server to start..."
sleep 10  # Wait for the server to fully start up

echo "Running Llama2 model..."
ollama pull llama2

echo "Running Mistral model..."
ollama pull mistral

echo "Waiting for Ollama server to be active..."
while [ "$(ollama list | grep 'NAME')" == "" ]; do
  sleep 1
done

echo "Ollama server is active and models are running."
