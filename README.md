# LLM Assignment

## Overview

This project implements a distributed Large Language Model (LLM) system using Python and Node.js. It enables users to interact with Llama2 and Mistral models through a robust API.

## Requirements

- **Docker**
- **Docker Compose**

## Setup Instructions

1. **Clone the Repository**: Begin by cloning the repository to your local machine.
   
   ```bash
   git clone <repository_url>
   ```

2. **Navigate to Project Directory**: Change into the project directory.

   ```bash
   cd <project_directory>
   ```

3. **Build and Start Services**: Use one of the following commands to build and start the services:

   ```bash
   docker-compose up --build
   ```

   Or, alternatively:

   ```bash
   ./run_app.sh
   ```

4. **Access the APIs**:
   - The Python API will be available at: [http://localhost:8000](http://localhost:8000)
   - The Node.js API server will be accessible at: [http://localhost:3000](http://localhost:3000)

## API Endpoints

### 1. Send a Query
- **Endpoint**: `POST /query`
- **Description**: Sends a query to the FastAPI service.
- **Request Body**:
  
  ```json
  {
    "query": "your_query_here",
    "conversation_id": "your_conversation_id_here",
    "model_name": "your_model_name_here"  // Options: 'mistral' or 'llama2'
  }
  ```

- **Response**: Returns the response from the FastAPI service.

### 2. List All Conversations
- **Endpoint**: `GET /conversations`
- **Description**: Retrieves a list of all conversations.
- **Response**: Returns an array of conversation objects.

### 3. Get a Specific Conversation by ID
- **Endpoint**: `GET /conversations/:id`
- **Description**: Retrieves a specific conversation by its ID.
- **URL Parameters**:
  - `id`: The ID of the conversation you want to retrieve.
- **Response**: Returns the conversation object or a 404 error if the conversation is not found.

## Performance Considerations

The performance of the system, including response times, is influenced by the processing power and available resources of your machine. Generally, faster hardware will yield quicker response times and enhance overall performance.
