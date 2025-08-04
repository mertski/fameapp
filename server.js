const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Proxy endpoint for text-to-image generation
app.post('/api/generate', async (req, res) => {
  try {
    console.log('Proxying request to Runway API...');
    
    const response = await fetch('https://api.dev.runwayml.com/v1/text_to_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
        'X-Runway-Version': '2024-11-06'
      },
      body: JSON.stringify(req.body)
    });

    const result = await response.json();
    console.log('Runway API response:', result);
    
    res.json(result);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for task status
app.get('/api/task/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    console.log('Checking task status for:', taskId);
    
    const response = await fetch(`https://api.dev.runwayml.com/v1/tasks/${taskId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
        'X-Runway-Version': '2024-11-06'
      }
    });

    const result = await response.json();
    console.log('Task status:', result);
    
    res.json(result);
  } catch (error) {
    console.error('Task status error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
}); 