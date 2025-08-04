const https = require('https');
const fs = require('fs');
const path = require('path');

// Comprehensive list of 200+ popular celebrities from different sectors
const celebrityList = [
  // Music Artists (40)
  'Drake', 'Ed Sheeran', 'Ariana Grande', 'Justin Bieber', 'Beyoncé', 'Rihanna', 'The Weeknd', 'Post Malone', 'Billie Eilish', 'Dua Lipa',
  'Lady Gaga', 'Bruno Mars', 'Adele', 'Kendrick Lamar', 'Travis Scott', 'Cardi B', 'Nicki Minaj', 'Doja Cat', 'Olivia Rodrigo', 'Lil Nas X',
  'Bad Bunny', 'J Balvin', 'Shakira', 'Maluma', 'Karol G', 'Anitta', 'BTS', 'Blackpink', 'Twice', 'Red Velvet',
  'Coldplay', 'Imagine Dragons', 'Maroon 5', 'One Direction', 'Harry Styles', 'Zayn Malik', 'Niall Horan', 'Liam Payne', 'Louis Tomlinson', 'Shawn Mendes',
  
  // Actors/Actresses (50)
  'Leonardo DiCaprio', 'Brad Pitt', 'Angelina Jolie', 'Johnny Depp', 'Jennifer Lawrence', 'Scarlett Johansson', 'Margot Robbie', 'Gal Gadot', 'Henry Cavill', 'Ryan Reynolds',
  'Hugh Jackman', 'Robert Downey Jr.', 'Chris Hemsworth', 'Chris Evans', 'Mark Ruffalo', 'Jeremy Renner', 'Tom Holland', 'Zendaya', 'Timothée Chalamet', 'Florence Pugh',
  'Sydney Sweeney', 'Jenna Ortega', 'Millie Bobby Brown', 'Noah Schnapp', 'Finn Wolfhard', 'Caleb McLaughlin', 'Gaten Matarazzo', 'Sadie Sink', 'Maya Hawke', 'Natalia Dyer',
  'Emma Stone', 'Ryan Gosling', 'Emma Watson', 'Daniel Radcliffe', 'Rupert Grint', 'Tom Hanks', 'Will Smith', 'Denzel Washington', 'Morgan Freeman', 'Samuel L. Jackson',
  'Meryl Streep', 'Sandra Bullock', 'Julia Roberts', 'Nicole Kidman', 'Reese Witherspoon', 'Charlize Theron', 'Cate Blanchett', 'Viola Davis', 'Octavia Spencer', 'Lupita Nyong\'o',
  
  // Sports - Soccer (20)
  'Lionel Messi', 'Cristiano Ronaldo', 'Neymar', 'Kylian Mbappé', 'Erling Haaland', 'Mohamed Salah', 'Kevin De Bruyne', 'Virgil van Dijk', 'Sadio Mané', 'Robert Lewandowski',
  'Karim Benzema', 'Luka Modrić', 'Toni Kroos', 'Sergio Ramos', 'Gerard Piqué', 'Andrés Iniesta', 'Xavi Hernández', 'Iker Casillas', 'Carles Puyol', 'David Villa',
  
  // Sports - Basketball (15)
  'LeBron James', 'Stephen Curry', 'Kevin Durant', 'Giannis Antetokounmpo', 'Luka Dončić', 'Joel Embiid', 'Nikola Jokić', 'Damian Lillard', 'James Harden', 'Russell Westbrook',
  'Anthony Davis', 'Kawhi Leonard', 'Paul George', 'Jimmy Butler', 'Bam Adebayo',
  
  // Sports - Other (15)
  'Serena Williams', 'Venus Williams', 'Roger Federer', 'Rafael Nadal', 'Novak Djokovic', 'Usain Bolt', 'Michael Phelps', 'Simone Biles', 'Katie Ledecky', 'Caeleb Dressel',
  'Tiger Woods', 'Rory McIlroy', 'Jon Rahm', 'Dustin Johnson', 'Brooks Koepka',
  
  // Business & Tech (20)
  'Elon Musk', 'Mark Zuckerberg', 'Jeff Bezos', 'Bill Gates', 'Warren Buffett', 'Jack Ma', 'Larry Page', 'Sergey Brin', 'Sundar Pichai', 'Tim Cook',
  'Satya Nadella', 'Jensen Huang', 'Sam Altman', 'Jensen Huang', 'Larry Ellison', 'Michael Dell', 'Steve Jobs', 'Paul Allen', 'Steve Wozniak', 'Reed Hastings',
  
  // Politics & Leaders (15)
  'Joe Biden', 'Donald Trump', 'Barack Obama', 'Hillary Clinton', 'Kamala Harris', 'Vladimir Putin', 'Xi Jinping', 'Emmanuel Macron', 'Angela Merkel', 'Justin Trudeau',
  'Boris Johnson', 'Narendra Modi', 'Jair Bolsonaro', 'Andrés Manuel López Obrador', 'Pedro Sánchez',
  
  // Streamers & Influencers (15)
  'Ninja', 'PewDiePie', 'MrBeast', 'IShowSpeed', 'Dream', 'GeorgeNotFound', 'Sapnap', 'BadBoyHalo', 'Technoblade', 'TommyInnit',
  'Tubbo', 'Ranboo', 'Quackity', 'Karl Jacobs', 'Foolish Gamers',
  
  // Historical Figures (10)
  'Albert Einstein', 'Mahatma Gandhi', 'Martin Luther King Jr.', 'Nelson Mandela', 'Mother Teresa', 'Princess Diana', 'John F. Kennedy', 'Abraham Lincoln', 'Winston Churchill', 'Queen Elizabeth II'
];

const laLocations = [
  'Beverly Hills', 'Hollywood Boulevard', 'Venice Beach', 'Santa Monica Pier', 'Downtown LA', 'West Hollywood', 'Silver Lake', 'Echo Park', 'Los Feliz', 'Highland Park',
  'Studio City', 'Burbank', 'Glendale', 'Pasadena', 'Culver City', 'Manhattan Beach', 'Hermosa Beach', 'Long Beach', 'Redondo Beach', 'Marina del Rey',
  'Venice Beach Boardwalk', 'Santa Monica', 'Malibu', 'Downtown LA Arts District', 'Melrose Avenue', 'Burbank', 'Studio City', 'Culver City', 'Pasadena', 'Los Feliz'
];

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      if (res.headers['content-type'] && res.headers['content-type'].startsWith('image/')) {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      } else {
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            resolve(jsonData);
          } catch (error) {
            reject(error);
          }
        });
      }
    }).on('error', (error) => {
      reject(error);
    });
  });
}

async function fetchCelebrityData(celebrityName) {
  try {
    const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(celebrityName)}`;
    console.log(`🔗 Fetching from: ${searchUrl}`);
    const data = await makeRequest(searchUrl);
    
    if (data.title && data.extract) {
      const imageUrl = data.original?.source || data.thumbnail?.source || null;
      const celebrityId = celebrityName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      const randomLocation = laLocations[Math.floor(Math.random() * laLocations.length)];
      const prompt = `Take an extremely ordinary and unremarkable iPhone selfie, with no clear subject or sense of composition—just a quick accidental snapshot. The photo has slight motion blur and uneven lighting from streetlights or indoor lamps, causing mild overexposure in some areas. The angle is awkward and the framing is messy, giving the picture a deliberately mediocre feel, as if it was taken absentmindedly while pulling the phone from a pocket. The main character is user, and ${celebrityName} stands next to him, both caught in a casual, imperfect moment. The background shows a lively ${randomLocation} at night, with neon lights, traffic, and blurry figures passing by. The overall look is intentionally plain and random, capturing the authentic vibe of a poorly composed, spontaneous iPhone selfie.`;

      // Determine category based on celebrity type
      let category = 'Other';
      if (celebrityName.includes('Messi') || celebrityName.includes('Ronaldo') || celebrityName.includes('Neymar') || celebrityName.includes('Mbappé') || celebrityName.includes('Haaland') || celebrityName.includes('Salah') || celebrityName.includes('De Bruyne') || celebrityName.includes('van Dijk') || celebrityName.includes('Mané') || celebrityName.includes('Lewandowski') || celebrityName.includes('Benzema') || celebrityName.includes('Modrić') || celebrityName.includes('Kroos') || celebrityName.includes('Ramos') || celebrityName.includes('Piqué') || celebrityName.includes('Iniesta') || celebrityName.includes('Xavi') || celebrityName.includes('Casillas') || celebrityName.includes('Puyol') || celebrityName.includes('Villa')) {
        category = 'Sports';
      } else if (celebrityName.includes('James') || celebrityName.includes('Curry') || celebrityName.includes('Durant') || celebrityName.includes('Antetokounmpo') || celebrityName.includes('Dončić') || celebrityName.includes('Embiid') || celebrityName.includes('Jokić') || celebrityName.includes('Lillard') || celebrityName.includes('Harden') || celebrityName.includes('Westbrook') || celebrityName.includes('Davis') || celebrityName.includes('Leonard') || celebrityName.includes('George') || celebrityName.includes('Butler') || celebrityName.includes('Adebayo')) {
        category = 'Sports';
      } else if (celebrityName.includes('Williams') || celebrityName.includes('Federer') || celebrityName.includes('Nadal') || celebrityName.includes('Djokovic') || celebrityName.includes('Bolt') || celebrityName.includes('Phelps') || celebrityName.includes('Biles') || celebrityName.includes('Ledecky') || celebrityName.includes('Dressel') || celebrityName.includes('Woods') || celebrityName.includes('McIlroy') || celebrityName.includes('Rahm') || celebrityName.includes('Johnson') || celebrityName.includes('Koepka')) {
        category = 'Sports';
      } else if (celebrityName.includes('Drake') || celebrityName.includes('Sheeran') || celebrityName.includes('Grande') || celebrityName.includes('Bieber') || celebrityName.includes('Beyoncé') || celebrityName.includes('Rihanna') || celebrityName.includes('Weeknd') || celebrityName.includes('Post Malone') || celebrityName.includes('Eilish') || celebrityName.includes('Lipa') || celebrityName.includes('Gaga') || celebrityName.includes('Mars') || celebrityName.includes('Adele') || celebrityName.includes('Lamar') || celebrityName.includes('Scott') || celebrityName.includes('Cardi B') || celebrityName.includes('Minaj') || celebrityName.includes('Cat') || celebrityName.includes('Rodrigo') || celebrityName.includes('Nas X') || celebrityName.includes('Bad Bunny') || celebrityName.includes('Balvin') || celebrityName.includes('Shakira') || celebrityName.includes('Maluma') || celebrityName.includes('Karol G') || celebrityName.includes('Anitta') || celebrityName.includes('BTS') || celebrityName.includes('Blackpink') || celebrityName.includes('Twice') || celebrityName.includes('Red Velvet') || celebrityName.includes('Coldplay') || celebrityName.includes('Imagine Dragons') || celebrityName.includes('Maroon 5') || celebrityName.includes('One Direction') || celebrityName.includes('Styles') || celebrityName.includes('Malik') || celebrityName.includes('Horan') || celebrityName.includes('Payne') || celebrityName.includes('Tomlinson') || celebrityName.includes('Mendes')) {
        category = 'Music';
      } else if (celebrityName.includes('DiCaprio') || celebrityName.includes('Pitt') || celebrityName.includes('Jolie') || celebrityName.includes('Depp') || celebrityName.includes('Lawrence') || celebrityName.includes('Johansson') || celebrityName.includes('Robbie') || celebrityName.includes('Gadot') || celebrityName.includes('Cavill') || celebrityName.includes('Reynolds') || celebrityName.includes('Jackman') || celebrityName.includes('Downey') || celebrityName.includes('Hemsworth') || celebrityName.includes('Evans') || celebrityName.includes('Ruffalo') || celebrityName.includes('Renner') || celebrityName.includes('Holland') || celebrityName.includes('Zendaya') || celebrityName.includes('Chalamet') || celebrityName.includes('Pugh') || celebrityName.includes('Sweeney') || celebrityName.includes('Ortega') || celebrityName.includes('Brown') || celebrityName.includes('Schnapp') || celebrityName.includes('Wolfhard') || celebrityName.includes('McLaughlin') || celebrityName.includes('Matarazzo') || celebrityName.includes('Sink') || celebrityName.includes('Hawke') || celebrityName.includes('Dyer') || celebrityName.includes('Stone') || celebrityName.includes('Gosling') || celebrityName.includes('Watson') || celebrityName.includes('Radcliffe') || celebrityName.includes('Grint') || celebrityName.includes('Hanks') || celebrityName.includes('Smith') || celebrityName.includes('Washington') || celebrityName.includes('Freeman') || celebrityName.includes('Jackson') || celebrityName.includes('Streep') || celebrityName.includes('Bullock') || celebrityName.includes('Roberts') || celebrityName.includes('Kidman') || celebrityName.includes('Witherspoon') || celebrityName.includes('Theron') || celebrityName.includes('Blanchett') || celebrityName.includes('Davis') || celebrityName.includes('Spencer') || celebrityName.includes('Nyong\'o')) {
        category = 'Actors';
      } else if (celebrityName.includes('Musk') || celebrityName.includes('Zuckerberg') || celebrityName.includes('Bezos') || celebrityName.includes('Gates') || celebrityName.includes('Buffett') || celebrityName.includes('Ma') || celebrityName.includes('Page') || celebrityName.includes('Brin') || celebrityName.includes('Pichai') || celebrityName.includes('Cook') || celebrityName.includes('Nadella') || celebrityName.includes('Huang') || celebrityName.includes('Altman') || celebrityName.includes('Ellison') || celebrityName.includes('Dell') || celebrityName.includes('Jobs') || celebrityName.includes('Allen') || celebrityName.includes('Wozniak') || celebrityName.includes('Hastings')) {
        category = 'Business';
      } else if (celebrityName.includes('Biden') || celebrityName.includes('Trump') || celebrityName.includes('Obama') || celebrityName.includes('Clinton') || celebrityName.includes('Harris') || celebrityName.includes('Putin') || celebrityName.includes('Jinping') || celebrityName.includes('Macron') || celebrityName.includes('Merkel') || celebrityName.includes('Trudeau') || celebrityName.includes('Johnson') || celebrityName.includes('Modi') || celebrityName.includes('Bolsonaro') || celebrityName.includes('López Obrador') || celebrityName.includes('Sánchez')) {
        category = 'Politics';
      } else if (celebrityName.includes('Ninja') || celebrityName.includes('PewDiePie') || celebrityName.includes('MrBeast') || celebrityName.includes('IShowSpeed') || celebrityName.includes('Dream') || celebrityName.includes('GeorgeNotFound') || celebrityName.includes('Sapnap') || celebrityName.includes('BadBoyHalo') || celebrityName.includes('Technoblade') || celebrityName.includes('TommyInnit') || celebrityName.includes('Tubbo') || celebrityName.includes('Ranboo') || celebrityName.includes('Quackity') || celebrityName.includes('Karl Jacobs') || celebrityName.includes('Foolish Gamers')) {
        category = 'Streamers';
      } else if (celebrityName.includes('Einstein') || celebrityName.includes('Gandhi') || celebrityName.includes('King') || celebrityName.includes('Mandela') || celebrityName.includes('Teresa') || celebrityName.includes('Diana') || celebrityName.includes('Kennedy') || celebrityName.includes('Lincoln') || celebrityName.includes('Churchill') || celebrityName.includes('Elizabeth')) {
        category = 'Historical';
      }

      return {
        id: celebrityId,
        name: celebrityName,
        image: imageUrl || '/images/placeholder-celebrity.jpg',
        description: data.extract.substring(0, 200) + '...',
        prompt: prompt,
        category: category
      };
    }
  } catch (error) {
    console.error(`Error fetching data for ${celebrityName}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🎭 Fetching 200+ popular celebrities from Wikipedia...');
  const celebrities = [];
  const processedNames = new Set(); // To avoid duplicates
  
  for (const celebrityName of celebrityList) {
    if (processedNames.has(celebrityName.toLowerCase())) {
      console.log(`⏭️ Skipping duplicate: ${celebrityName}`);
      continue;
    }
    
    console.log(`📡 Fetching data for ${celebrityName}...`);
    const celebrityData = await fetchCelebrityData(celebrityName);
    
    if (celebrityData) {
      processedNames.add(celebrityName.toLowerCase());
      celebrities.push(celebrityData);
      console.log(`✅ Added ${celebrityName} (${celebrityData.category})`);
    } else {
      console.log(`❌ Failed to fetch ${celebrityName}`);
    }
    
    // Add delay to be respectful to Wikipedia API
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`Total celebrities fetched: ${celebrities.length}`);
  
  // Count by category
  const categoryCount = {};
  celebrities.forEach(celeb => {
    categoryCount[celeb.category] = (categoryCount[celeb.category] || 0) + 1;
  });
  
  console.log('\n📋 Category breakdown:');
  Object.entries(categoryCount).forEach(([category, count]) => {
    console.log(`${category}: ${count}`);
  });
  
  console.log('\n📋 Generated celebrity data:');
  console.log(JSON.stringify(celebrities, null, 2));
  
  const outputPath = path.join(__dirname, '200-celebrities.json');
  fs.writeFileSync(outputPath, JSON.stringify(celebrities, null, 2));
  console.log(`\n💾 Saved celebrity data to: ${outputPath}`);
  console.log('\n🎯 Next steps:');
  console.log('1. Review the generated data in 200-celebrities.json');
  console.log('2. Copy the celebrities array to your App.js file');
  console.log('3. Add the prompts to celebrityDefaultPrompts object');
  console.log('4. Test the new celebrities on your website!');
}

main().catch(console.error); 