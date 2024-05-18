# URL Summary API

This API takes a website URL as input and uses the OpenAI API to generate a summary of the URL's contents.

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm
- MongoDB

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/url-summary-api.git
   cd url-summary-api
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   MONGODB_URI=your_mongodb_uri_here
   MONGODB_DBNAME=your_mongodb_dbname_here
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Start the server:
   ```bash
   node index.js
   ```

## Usage

### Summarize Endpoint

- **URL:** `/summarize`
- **Method:** `POST`
- **Content-Type:** `application/json`
- **Body:**
  ```json
  {
    "url": "https://example.com"
  }
  ```

### Example Request

```bash
curl -X POST https://yyyaasg.srv.hanuman.build/summarize \
-H "Content-Type: application/json" \
-d '{"url": "https://example.com"}'
```

### Example Response

```json
{
  "summary": "This is a summary of the content from the provided URL."
}
```

## Environment Variables

- `MONGODB_URI`: The URI to connect to the MongoDB database.
- `MONGODB_DBNAME`: The name of the MongoDB database to connect to.
- `OPENAI_API_KEY`: The API key for accessing the OpenAI API. You can get it from the OpenAI website.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
