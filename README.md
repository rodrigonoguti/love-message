# Messages of Love 💕

A beautiful React application that displays animated love messages as you scroll down the page. Each message appears with smooth animations, 3D effects, and romantic styling.

⚠️ PS: project made with vibe-coding.

## Features ✨

- **Smooth Scroll Animations**: Messages appear with beautiful entrance animations as you scroll
- **3D Effects**: Cards have depth and hover effects with 3D transformations
- **Romantic Theme**: Beautiful gradient backgrounds, floating hearts, and starry night sky
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects and animated hearts
- **Modern UI**: Glass morphism effects, glowing borders, and smooth transitions

## Technologies Used 🛠️

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Framer Motion** - Smooth animations and transitions
- **React Intersection Observer** - Scroll-triggered animations
- **CSS3** - Advanced styling with gradients, animations, and 3D effects

## Getting Started 🚀

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` to see the app in action!

## Project Structure 📁

```
src/
├── App.jsx          # Main component with love messages and animations
├── App.css          # Beautiful styling with romantic theme
├── main.jsx         # React app entry point
└── index.css        # Global styles
```

## Customization 🎨

### Adding New Messages

Edit the `loveMessages` array in `src/App.jsx`:

```javascript
const loveMessages = [
  {
    id: 11,
    message: "Your custom love message here...",
    author: "Your Name", // Optional
    photo: "https://your-image-url.com/image.jpg", // Optional photo
  },
  // ... add more messages
];
```

### Adding Photos to Messages

You can add photos to any message by including a `photo` property with the image URL:

```javascript
{
  id: 3,
  message: "You are the poetry I never knew how to write...",
  author: "My Muse",
  photo: "https://example.com/romantic-photo.jpg"
}
```

### Customizing Background Music

Change the YouTube video that plays as background music by updating the `youtubeVideo` constant in `src/App.jsx`:

```javascript
const youtubeVideo =
  "https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1&playlist=YOUR_VIDEO_ID&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&mute=0&start=0";
```

**Note:** The background music only starts playing after the user begins scrolling.

### Changing Colors

Modify the CSS variables and gradients in `src/App.css` to customize the color scheme.

### Animation Settings

Adjust animation durations and effects in the Framer Motion variants within `src/App.jsx`.

## Build for Production 📦

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## Features in Detail 🌟

- **Hero Section**: Animated title with glowing text effects
- **Floating Hearts**: Continuously animated hearts floating across the screen
- **Starry Background**: Animated star field with moving gradients
- **Scroll Indicators**: Bouncing arrow to guide user interaction
- **Responsive Layout**: Adapts beautifully to all screen sizes

## Browser Support 🌐

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License 📄

This project is open source and available under the MIT License.

---

Made with 💖 for all the lovers in the world! :)
