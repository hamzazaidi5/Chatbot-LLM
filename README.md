# Distributed LLM Assignment

## Overview

This project implements a distributed LLM system using Python and Node.js. It allows users to interact with Llama2 and Mistral models through an API.

## Requirements

- Docker
- Docker Compose

## Setup

1. Clone the repository.
2. Navigate to the project directory.
3. Run the following command to build and start the services:

   ```bash
   docker-compose up --build

4. The Python API will be accessible at http://localhost:5000
5. The Node.js API server will be accessible at http://localhost:3000

## API Endpoints
1. Send a Query
Endpoint: POST /query
Description: Sends a query to the FastAPI service.
Request Body
```{
  "query": "your_query_here",
  "conversation_id": "your_conversation_id_here",
  "model_name": "your_model_name_here"  //mistral or llama2
}

Response: Returns the response from the FastAPI service.

2. List All Conversations
Endpoint: GET /conversations
Description: Retrieves a list of all conversations.
Response: Returns an array of conversation objects.

3. Get a Specific Conversation by ID
Endpoint: GET /conversations/:id
Description: Retrieves a specific conversation by its ID.
URL Parameters:
id: The ID of the conversation you want to retrieve.
Response: Returns the conversation object or a 404 error if not found.