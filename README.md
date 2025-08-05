# FameApp 🌟

AI-powered photo editing and celebrity selfie generation app built with React. Create stunning photos with celebrities, apply AI-powered edits, and explore different creative universes.

## 🚀 Features

### Core Functionality
- **Celebrity Selfies**: Generate realistic selfies with over 200+ celebrities from various categories
- **AI Photo Editor**: Advanced photo editing using AI models including FLUX and OpenAI
- **Creative Universes**: Apply themed transformations and effects to your photos
- **Photo Library**: Save, manage, and organize your generated photos
- **User Authentication**: Secure login system with usage tracking

### Available Categories
- **Music**: Taylor Swift, Drake, Ed Sheeran, Ariana Grande, Justin Bieber, Beyoncé, and more
- **Actors**: Tom Cruise, Angelina Jolie, Johnny Depp, Jennifer Lawrence, and more
- **Sports**: Lionel Messi, Cristiano Ronaldo, LeBron James, Stephen Curry, and more
- **Business**: Elon Musk, Mark Zuckerberg, Jeff Bezos, Bill Gates, and more
- **Politics**: Joe Biden, Donald Trump, Barack Obama, and more

### AI-Powered Features
- **Face Detection**: Automatic face positioning for optimal celebrity selfies
- **Multiple AI Models**: Integration with FLUX Kontext API and OpenAI for image generation
- **Real-time Processing**: Live preview and generation tracking
- **Smart Prompts**: Contextual prompts for natural-looking celebrity interactions

## 🛠 Tech Stack

- **Frontend**: React 19.1.0 with modern hooks and state management
- **Styling**: Custom CSS with responsive design
- **AI Integration**: 
  - OpenAI API for image generation and editing
  - FLUX Kontext API for advanced image manipulation
  - MediaPipe for face detection
- **Backend Services**: Express.js proxy server for API calls
- **Image Processing**: Canvas API for client-side image manipulation
- **Authentication**: Local storage with user session management

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Git

### Setup
```bash
# Clone the repository
git clone https://github.com/bertongen/fameapp.git
cd fameapp

# Install dependencies
npm install

# Set up environment variables (create .env file)
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here

# Start the development server
npm start
```

The app will be available at `http://localhost:3000` (or next available port).

### Proxy Server (Optional)
For advanced image editing features, start the proxy server:
```bash
# Start proxy server on port 3001
node server.js
```

## 🎮 Usage

### Getting Started
1. **Login**: Create an account or use test login for demo access
2. **Upload Photo**: Add your selfie to the photo library
3. **Choose Celebrity**: Browse categories and select your favorite celebrity
4. **Generate**: Create your celebrity selfie with AI
5. **Edit**: Use the AI editor for additional enhancements
6. **Save & Share**: Download or share your creations

### Celebrity Selfies
- Browse 200+ celebrities across multiple categories
- Select your photo and celebrity for realistic generation
- AI automatically positions faces for natural-looking results
- Custom prompts for various scenarios (LA locations, events, etc.)

### AI Editor
- **Quick Edits**: Age adjustment, style changes, background modifications
- **Advanced Features**: Universe themes, custom prompts, multiple AI models
- **Real-time Preview**: See changes as they're generated
- **History Tracking**: Undo/redo functionality for all edits

## 🌐 Deployment

### Vercel Deployment
The app is optimized for Vercel deployment:

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel deploy
```

### Environment Variables
Set these in your Vercel dashboard:
- `REACT_APP_OPENAI_API_KEY`: Your OpenAI API key
- `RUNWAY_API_KEY`: For advanced AI features (optional)

### Custom Domain
To connect fameapp.co domain:
1. Add domain in Vercel dashboard
2. Update DNS records to point to Vercel
3. Configure SSL certificates (automatic with Vercel)

## 📁 Project Structure

```
FameApp/
├── public/
│   ├── images/                 # Celebrity images and assets
│   └── index.html
├── src/
│   ├── App.js                  # Main React component (7,849 lines)
│   ├── App.css                 # Comprehensive styling (10,676 lines)
│   ├── firebase.js             # Firebase configuration
│   └── index.js                # React entry point
├── server.js                   # Express proxy server
├── proxy-server.js             # Alternative proxy setup
├── fetch-celebrities.js        # Celebrity data fetching utility
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🔧 Configuration

### API Keys Required
- **OpenAI API**: For image generation and editing
- **FLUX API**: For advanced image manipulation (optional)
- **ImgBB API**: For image hosting (optional)

### Supported Image Formats
- Input: JPG, PNG, WebP
- Output: JPG, PNG
- Maximum size: 50MB uploads

### Browser Support
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+

## 🚀 Performance

- **Fast Loading**: Optimized React components with lazy loading
- **Image Optimization**: Automatic compression and resizing
- **Caching**: Local storage for user data and photo library
- **Progressive Enhancement**: Works without JavaScript for basic features

## 🔒 Security & Privacy

- **Client-side Processing**: Images processed locally when possible
- **Secure API Calls**: All AI API calls go through proxy server
- **No Data Storage**: User photos not permanently stored on servers
- **Privacy First**: GDPR compliant data handling

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: Report bugs via GitHub Issues
- **Documentation**: Check the code comments for detailed implementation
- **Community**: Join our Discord for discussions and support

## 🔮 Roadmap

- [ ] Video generation capabilities
- [ ] More AI model integrations
- [ ] Social sharing features
- [ ] Mobile app versions
- [ ] Advanced editing tools
- [ ] Collaboration features

---

**Built with ❤️ using React and AI** | [Live Demo](https://fameapp.co) | [GitHub](https://github.com/bertongen/fameapp)