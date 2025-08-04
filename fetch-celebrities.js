const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

// Popular celebrities to fetch from Wikipedia
const celebrityList = [
  'Taylor Swift',
  'Tom Cruise', 
  'Angelina Jolie',
  'Johnny Depp',
  'Jennifer Lawrence'
];

// LA locations for iPhone selfie prompts
const laLocations = [
  'Beverly Hills',
  'Hollywood Boulevard', 
  'Venice Beach',
  'Santa Monica Pier',
  'Downtown LA'
];

async function fetchCelebrityData(celebrityName) {
  try {
    // Search for the celebrity on Wikipedia
    const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(celebrityName)}`;
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    if (data.title && data.extract) {
      // Get the image URL if available
      const imageUrl = data.original?.source || data.thumbnail?.source || null;
      
      // Create the celebrity ID (lowercase, hyphenated)
      const celebrityId = celebrityName.toLowerCase().replace(/\s+/g, '-');
      
      // Get a random LA location
      const randomLocation = laLocations[Math.floor(Math.random() * laLocations.length)];
      
      // Generate iPhone selfie style prompt
      const prompt = `Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and ${celebrityName} stands next to him, both caught in a casual, imperfect moment. The background shows a lively ${randomLocation} at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.`;
      
      return {
        id: celebrityId,
        name: celebrityName,
        image: imageUrl || '/images/placeholder-celebrity.jpg', // Fallback image
        description: data.extract.substring(0, 200) + '...',
        prompt: prompt
      };
    }
  } catch (error) {
    console.error(`Error fetching data for ${celebrityName}:`, error.message);
    return null;
  }
}

async function downloadImage(imageUrl, celebrityId) {
  try {
    if (!imageUrl || imageUrl.includes('placeholder')) {
      return null;
    }
    
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    
    // Create images directory if it doesn't exist
    const imagesDir = path.join(__dirname, 'public', 'images');
    if (!fs.existsSync(imagesDir)) {
      fs.mkdirSync(imagesDir, { recursive: true });
    }
    
    // Save image with celebrity ID
    const imagePath = path.join(imagesDir, `${celebrityId}.jpg`);
    fs.writeFileSync(imagePath, buffer);
    
    return `/images/${celebrityId}.jpg`;
  } catch (error) {
    console.error(`Error downloading image for ${celebrityId}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🎭 Fetching 5 popular celebrities from Wikipedia...');
  
  const celebrities = [];
  
  for (const celebrityName of celebrityList) {
    console.log(`📡 Fetching data for ${celebrityName}...`);
    const celebrityData = await fetchCelebrityData(celebrityName);
    
    if (celebrityData) {
      // Download and save the image
      const imagePath = await downloadImage(celebrityData.image, celebrityData.id);
      if (imagePath) {
        celebrityData.image = imagePath;
      }
      
      celebrities.push(celebrityData);
      console.log(`✅ Added ${celebrityName}`);
    } else {
      console.log(`❌ Failed to fetch ${celebrityName}`);
    }
    
    // Small delay to be respectful to Wikipedia's API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('\n📋 Generated celebrity data:');
  console.log(JSON.stringify(celebrities, null, 2));
  
  // Save to a JSON file for easy integration
  const outputPath = path.join(__dirname, 'new-celebrities.json');
  fs.writeFileSync(outputPath, JSON.stringify(celebrities, null, 2));
  console.log(`\n💾 Saved celebrity data to: ${outputPath}`);
  
  console.log('\n🎯 Next steps:');
  console.log('1. Review the generated data in new-celebrities.json');
  console.log('2. Copy the celebrities array to your App.js file');
  console.log('3. Add the prompts to celebrityDefaultPrompts object');
  console.log('4. Test the new celebrities on your website!');
}

main().catch(console.error); 