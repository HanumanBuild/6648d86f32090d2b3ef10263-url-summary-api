const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const axios = require('axios');
const { Configuration, OpenAIApi } = require('openai');
const { convert } = require('html-to-text');

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Basic route
app.get('/', (req, res) => {
  res.send('URL Summary API');
});

app.post('/summarize', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).send({ error: 'URL is required' });
  }

  try {
    // Fetch the content of the URL
    const response = await axios.get(url);
    const htmlContent = response.data;

    // Convert HTML to text
    const textContent = convert(htmlContent, {
      wordwrap: 130
    });

    // Generate summary using OpenAI
    const openaiResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Summarize the following text: "${textContent}"`,
      max_tokens: 100
    });

    const summary = openaiResponse.data.choices[0].text.trim();

    // Send the summary as a response
    res.send({ summary });
  } catch (error) {
    console.error('Error summarizing URL:', error);
    res.status(500).send({ error: 'Failed to summarize the URL' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});