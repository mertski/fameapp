const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Proxy server is running' });
});

// Proxy endpoint for text-to-image generation
app.post('/api/generate', async (req, res) => {
  try {
    console.log('🚀 [PROXY] Proxying request to Runway API...');
    console.log('🔍 [PROXY] Raw request body:', JSON.stringify(req.body, null, 2));
    
    // Transform the request to match Runway API format
    const runwayRequest = {
      promptText: req.body.promptText,
      ratio: req.body.ratio,
      seed: req.body.seed,
      model: req.body.model,
      referenceImages: req.body.referenceImages,
      contentModeration: req.body.contentModeration
    };
    
    console.log('🔄 [PROXY] Transformed request for Runway:', JSON.stringify(runwayRequest, null, 2));
    console.log('🌐 [PROXY] Target URL: https://api.dev.runwayml.com/v1/text_to_image');
    console.log('📋 [PROXY] Headers will be:');
    console.log('  - Content-Type: application/json');
    console.log('  - Authorization: Bearer [API_KEY]');
    console.log('  - X-Runway-Version: 2024-11-06');
    
    const response = await fetch('https://api.dev.runwayml.com/v1/text_to_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RUNWAY_API_KEY}`,
        'X-Runway-Version': '2024-11-06'
      },
      body: JSON.stringify(runwayRequest)
    });

    const result = await response.json();
    console.log('✅ [PROXY] Response status:', response.status);
    console.log('📤 [PROXY] Runway API response:', result);
    
    if (result.error) {
      console.error('❌ [PROXY] Runway API returned error:', result.error);
    }
    
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

// Proxy endpoint for FLUX Kontext API
app.post('/api/flux', async (req, res) => {
  try {
    console.log('Proxying request to FLUX Kontext API...');
    
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FLUX_API_KEY}`
      },
      body: JSON.stringify({
        version: "black-forest-labs/flux-kontext-pro",
        input: req.body
      })
    });

    const result = await response.json();
    console.log('FLUX API response:', result);
    
    res.json(result);
  } catch (error) {
    console.error('FLUX proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Proxy endpoint for FLUX prediction status
app.get('/api/flux/:predictionId', async (req, res) => {
  try {
    const { predictionId } = req.params;
    console.log('Checking FLUX prediction status for:', predictionId);
    
    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: {
        'Authorization': `Bearer ${process.env.FLUX_API_KEY}`
      }
    });

    const result = await response.json();
    console.log('FLUX prediction status:', result);
    
    res.json(result);
  } catch (error) {
    console.error('FLUX prediction status error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
}); 