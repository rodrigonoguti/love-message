import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './App.css';

const youtubeVideo = "https://www.youtube.com/embed/l6VdQC-i-SE?autoplay=1&loop=1&controls=0&showinfo=0&rel=0&modestbranding=1&mute=0&start=0"

const loveMessages = [
  {
    id: 1,
    message: "Every moment with you feels like a beautiful dream I never want to wake up from.",
    author: "Your Heart"
  },
  {
    id: 2,
    message: "In your eyes, I found my home. In your heart, I found my love. In your soul, I found my mate.",
    author: "Forever Yours"
  },
  {
    id: 3,
    message: "You are the poetry I never knew how to write and the song I never knew how to sing.",
    author: "My Muse"
  },
  {
    id: 4,
    message: "Love is not about how many days, months, or years you have been together. It's about how much you love each other every single day.",
    author: "Timeless Love"
  },
  {
    id: 5,
    message: "You make my heart smile in ways I never thought possible.",
    author: "Pure Joy"
  },
  {
    id: 6,
    message: "In a sea of people, my eyes will always search for you.",
    author: "My Compass"
  },
  {
    id: 7,
    message: "You are my today and all of my tomorrows.",
    author: "Eternal Promise"
  },
  {
    id: 8,
    message: "I love you not only for what you are, but for what I am when I am with you.",
    author: "Better Together"
  },
  {
    id: 9,
    message: "You are the missing piece I never knew my heart needed.",
    author: "Complete"
  },
  {
    id: 10,
    message: "Every love story is beautiful, but ours is my favorite.",
    author: "Our Story",
    photo: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&h=400&fit=crop&crop=center"
  }
];

const MessageSlide = ({ message, index, isActive }) => {
  const [ref, inView] = useInView({
    threshold: 0.7,
    triggerOnce: false
  });

  const slideVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      className="message-slide"
      variants={slideVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="slide-content">
        <motion.div
          className="message-number"
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>
        
        <motion.p
          className="message-text"
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {message.message}
        </motion.p>
        
        <motion.span
          className="message-author"
          variants={textVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          — {message.author}
        </motion.span>
        
        {message.photo && (
          <motion.div
            className="message-photo-container"
            variants={textVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="message-photo">
              <img 
                src={message.photo} 
                alt="Love memory" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

const FloatingHeart = ({ delay = 0 }) => {
  return (
    <motion.div
      className="floating-heart"
      initial={{ y: "100vh", x: Math.random() * window.innerWidth, opacity: 0 }}
      animate={{ 
        y: "-100vh", 
        opacity: [0, 1, 1, 0],
        rotate: 360
      }}
      transition={{
        duration: 12,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      💕
    </motion.div>
  );
};

const ScrollProgress = ({ currentSlide, totalSlides }) => {
  const progress = currentSlide / totalSlides;
  
  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: progress }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: progress }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );
};

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const lastWheelTimeRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);

  useEffect(() => {
    let timeoutId;

    const handleWheel = (e) => {
      e.preventDefault();
      
      if (isScrollingRef.current) return;
      
      const now = Date.now();
      const timeDiff = now - lastWheelTimeRef.current;
      
      // Reset accumulated delta if too much time has passed (new gesture)
      if (timeDiff > 150) {
        accumulatedDeltaRef.current = 0;
      }
      
      lastWheelTimeRef.current = now;
      accumulatedDeltaRef.current += e.deltaY;
      
      // Threshold for trackpad vs mouse wheel detection
      const threshold = Math.abs(e.deltaY) > 50 ? 50 : 100;
      
      if (Math.abs(accumulatedDeltaRef.current) >= threshold) {
        const direction = accumulatedDeltaRef.current > 0 ? 1 : -1;
        
        // Set hasScrolled to true on first scroll
        if (!hasScrolled) {
          setHasScrolled(true);
        }
        
        setCurrentSlide(prev => {
          const newSlide = Math.max(0, Math.min(loveMessages.length, prev + direction));
          return newSlide;
        });
        
        // Reset accumulated delta
        accumulatedDeltaRef.current = 0;
        
        isScrollingRef.current = true;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          isScrollingRef.current = false;
        }, 800);
      }
    };

    const handleKeyDown = (e) => {
      if (isScrollingRef.current) return;
      
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        // Set hasScrolled to true on first keyboard navigation
        if (!hasScrolled) {
          setHasScrolled(true);
        }
        setCurrentSlide(prev => Math.min(loveMessages.length, prev + 1));
        isScrollingRef.current = true;
        setTimeout(() => { isScrollingRef.current = false; }, 800);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        // Set hasScrolled to true on first keyboard navigation
        if (!hasScrolled) {
          setHasScrolled(true);
        }
        setCurrentSlide(prev => Math.max(0, prev - 1));
        isScrollingRef.current = true;
        setTimeout(() => { isScrollingRef.current = false; }, 800);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
      }
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const targetScroll = currentSlide * window.innerHeight;
      container.scrollTo({
        top: targetScroll,
        behavior: 'smooth'
      });
    }
  }, [currentSlide]);

  return (
    <div className="App" ref={containerRef}>
      <div className="background-gradient"></div>
      <div className="stars"></div>
      
      {/* Hidden YouTube Video for Background Music - Only plays after first scroll */}
      {hasScrolled && (
        <div className="hidden-video">
          <iframe
            width="1"
            height="1"
            src={youtubeVideo}
            title="Background Music"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              position: 'absolute',
              top: '-9999px',
              left: '-9999px',
              visibility: 'hidden',
              opacity: 0,
              pointerEvents: 'none'
            }}
          ></iframe>
        </div>
      )}
      
      <ScrollProgress currentSlide={currentSlide} totalSlides={loveMessages.length} />
      
      {/* Floating Hearts */}
      {[...Array(3)].map((_, i) => (
        <FloatingHeart key={i} delay={i * 4} />
      ))}
      
      <header className="hero-section">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="hero-content"
        >
          <motion.h1
            className="hero-title"
            animate={{ 
              textShadow: [
                "0 0 20px #ff69b4",
                "0 0 40px #ff1493",
                "0 0 20px #ff69b4"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Messages of Love
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Scroll down to discover beautiful messages that speak to the heart
          </motion.p>
          <motion.div
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ↓
          </motion.div>
        </motion.div>
      </header>

      <main className="messages-container">
        {loveMessages.map((message, index) => (
          <MessageSlide 
            key={message.id} 
            message={message} 
            index={index}
            isActive={currentSlide === index + 1}
          />
        ))}
      </main>

      <footer className="footer-slide">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="footer-content"
        >
          <p>Made with 💕 for all the lovers in the world</p>
        </motion.div>
      </footer>
    </div>
  );
}

export default App;
