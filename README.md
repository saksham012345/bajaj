# BFHL Qualifier 1 - Chitkara University API

## Overview
A production-ready REST API built with Node.js, Express, and polished for the Chitkara University Qualifier 1.

## Setup & Local Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Setup**:
    - Rename `.env.example` (or create `.env`) and add your keys:
    ```env
    PORT=3000
    GEMINI_API_KEY=your_gemini_api_key
    OFFICIAL_EMAIL=your_email@chitkara.edu.in
    ```

3.  **Start Server**:
    ```bash
    npm start
    ```
    Server runs on `http://localhost:3000`.

## Deployment

### Render / Railway / Vercel
1.  Push code to GitHub.
2.  Connect repository to your hosting provider.
3.  Add Environment Variables (`GEMINI_API_KEY`, `OFFICIAL_EMAIL`) in the dashboard.
4.  Deploy. The `start` script will handle execution.

## API Endpoints

### 1. GET /health
Checks API status and returns email.
- **Response**:
  ```json
  {
    "is_success": true,
    "official_email": "YOUR_CHITKARA_EMAIL"
  }
  ```

### 2. POST /bfhl
Handles specific logic operations based on the **single key** provided in the body.

#### Valid Requests (Examples)

**Fibonacci** (Returns first N numbers):
```json
{ "fibonacci": 8 }
```

**Prime Check** (Returns boolean):
```json
{ "prime": 17 }
```

**LCM** (Returns LCM of array):
```json
{ "lcm": [4, 5, 6] }
```

**HCF** (Returns HCF/GCD of array):
```json
{ "hcf": [24, 36, 48] }
```

**AI** (Returns 1-word summary/answer):
```json
{ "AI": "What is the color of the sky?" }
```

## Edge Cases Handled

1.  **Invalid JSON Structure**:
    - Sending multiple keys -> 400 Bad Request.
    - Sending integers for array inputs (LCM/HCF) -> 400.
    - Sending negative numbers for Fibonacci -> 400.

2.  **Type Safety**:
    - String inputs for numbers are parsed or rejected.
    - Non-integer inputs where integers are expected (Fibonacci) are rejected.

3.  **AI Resilience**:
    - Trims extra whitespace.
    - Removes punctuation from the single-word response.
    - Handles API failures gracefully (500).

4.  **Performance**:
    - Fibonacci: Iterative O(N).
    - Prime: Optimized O(sqrt(N)).
    - HCF/LCM: Euclidean Algorithm.

## Project Structure
- `index.js`: Single-file entry point containing all logic.
- `package.json`: Dependency management.
- `.env`: Secret management.
