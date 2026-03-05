import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Hero: React.FC = () => {
  const [text, setText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const phrases = [
    "Full Stack MERN Developer",
    "React.js & Node.js Expert",
    "REST API & Database Integration",
    "Java OOP & Data Structures",
    "Responsive & Scalable Web Apps",
    "Next.js Business Websites",
    "Freelance & Client Solutions",
  ];

  // Coding symbols for the background
  const codingSymbols = [
    "{",
    "}",
    "(",
    ")",
    "[",
    "]",
    "<",
    ">",
    ";",
    "=",
    "+",
    "-",
    "*",
    "/",
    "%",
    "&",
    "|",
    "!",
    "?",
    ":",
    '"',
    "'",
    "`",
    "#",
    "@",
    "$",
    "^",
    "~",
  ];

  // Symbol positions state
  const [symbols, setSymbols] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      symbol: string;
      color: string;
      isFollowing: boolean;
      targetX: number;
      targetY: number;
      originalX: number;
      originalY: number;
      moveX: number;
      moveY: number;
      speed: number;
    }>
  >([]);

  // Initialize symbols with movement properties
  useEffect(() => {
    const initialSymbols = Array.from({ length: 50 }, (_, i) => {
      const speed = 0.02 + Math.random() * 0.03; // Slow movement speed
      const angle = Math.random() * Math.PI * 2; // Random initial direction
      return {
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        symbol: codingSymbols[Math.floor(Math.random() * codingSymbols.length)],
        color: [
          "#60A5FA",
          "#34D399",
          "#FBBF24",
          "#F472B6",
          "#A78BFA",
          "#2DD4BF",
          "#FB7185",
          "#38BDF8",
        ][i % 8],
        isFollowing: false,
        targetX: Math.random() * 80 + 10,
        targetY: Math.random() * 80 + 10,
        originalX: Math.random() * 80 + 10,
        originalY: Math.random() * 80 + 10,
        moveX: Math.cos(angle) * speed,
        moveY: Math.sin(angle) * speed,
        speed: speed,
      };
    });
    setSymbols(initialSymbols);
  }, []);

  // Typing effect
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const currentPhrase = phrases[currentIndex];

        if (!isDeleting) {
          // Typing forward
          if (text.length < currentPhrase.length) {
            setText(currentPhrase.substring(0, text.length + 1));
          } else {
            // Finished typing, wait then start deleting
            setTimeout(() => setIsDeleting(true), 1000);
          }
        } else {
          // Deleting
          if (text.length > 0) {
            setText(currentPhrase.substring(0, text.length - 1));
          } else {
            // Finished deleting, move to next phrase
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );

    return () => clearTimeout(timeout);
  }, [text, currentIndex, isDeleting]);

  // Mouse move handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setMousePosition({ x, y });

      // Update symbols to follow cursor
      setSymbols((prev) =>
        prev.map((symbol) => {
          if (isClicked) return symbol;

          const distance = Math.sqrt(
            Math.pow(symbol.x - x, 2) + Math.pow(symbol.y - y, 2),
          );

          // Follow cursor when close enough
          if (distance < 15) {
            const followDistance = 8;
            const angle = Math.atan2(y - symbol.y, x - symbol.x);
            let targetX = x - Math.cos(angle) * followDistance;
            let targetY = y - Math.sin(angle) * followDistance;

            // Keep within container bounds
            targetX = Math.max(5, Math.min(95, targetX));
            targetY = Math.max(5, Math.min(95, targetY));

            return {
              ...symbol,
              targetX,
              targetY,
              isFollowing: true,
            };
          } else {
            // Return to wandering movement
            return {
              ...symbol,
              isFollowing: false,
            };
          }
        }),
      );
    };

    const handleClick = () => {
      setIsClicked(true);

      // Scatter symbols but keep them inside container
      setSymbols((prev) =>
        prev.map((symbol) => {
          const angle = Math.atan2(
            symbol.y - mousePosition.y,
            symbol.x - mousePosition.x,
          );
          const scatterDistance = 15 + Math.random() * 20;

          let scatterX = symbol.x + Math.cos(angle) * scatterDistance;
          let scatterY = symbol.y + Math.sin(angle) * scatterDistance;

          // Ensure symbols stay within container bounds
          scatterX = Math.max(2, Math.min(98, scatterX));
          scatterY = Math.max(2, Math.min(98, scatterY));

          // Set new movement direction after scatter
          const newAngle = Math.random() * Math.PI * 2;
          return {
            ...symbol,
            targetX: scatterX,
            targetY: scatterY,
            moveX: Math.cos(newAngle) * symbol.speed,
            moveY: Math.sin(newAngle) * symbol.speed,
            isFollowing: false,
          };
        }),
      );

      // Reset after scatter animation
      setTimeout(() => {
        setIsClicked(false);
      }, 800);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [isClicked, mousePosition]);

  // Animation loop for smooth symbol movement (wandering + mouse interaction)
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      setSymbols((prev) =>
        prev.map((symbol) => {
          if (symbol.isFollowing || isClicked) {
            // Mouse interaction takes priority - smooth follow to target
            const speed = symbol.isFollowing ? 0.2 : 0.08;
            const newX = symbol.x + (symbol.targetX - symbol.x) * speed;
            const newY = symbol.y + (symbol.targetY - symbol.y) * speed;

            // Ensure symbols stay within container bounds
            const boundedX = Math.max(2, Math.min(98, newX));
            const boundedY = Math.max(2, Math.min(98, newY));

            return {
              ...symbol,
              x: boundedX,
              y: boundedY,
            };
          } else {
            // Wandering movement - slow random motion
            let newX = symbol.x + symbol.moveX;
            let newY = symbol.y + symbol.moveY;

            // Bounce off edges
            if (newX <= 2 || newX >= 98) {
              newX = Math.max(2, Math.min(98, newX));
              return {
                ...symbol,
                x: newX,
                y: newY,
                moveX: -symbol.moveX, // Reverse X direction
                moveY: symbol.moveY + (Math.random() - 0.5) * 0.01, // Slight Y change
              };
            }

            if (newY <= 2 || newY >= 98) {
              newY = Math.max(2, Math.min(98, newY));
              return {
                ...symbol,
                x: newX,
                y: newY,
                moveX: symbol.moveX + (Math.random() - 0.5) * 0.01, // Slight X change
                moveY: -symbol.moveY, // Reverse Y direction
              };
            }

            // Occasionally change direction slightly for more organic movement
            if (Math.random() < 0.005) {
              const angle =
                Math.atan2(symbol.moveY, symbol.moveX) +
                (Math.random() - 0.5) * 0.3;
              return {
                ...symbol,
                x: newX,
                y: newY,
                moveX: Math.cos(angle) * symbol.speed,
                moveY: Math.sin(angle) * symbol.speed,
              };
            }

            return {
              ...symbol,
              x: newX,
              y: newY,
            };
          }
        }),
      );

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Interactive Symbols Background */}
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
          {/* Interactive Symbols */}
          {symbols.map((symbol) => (
            <motion.div
              key={symbol.id}
              className="absolute font-mono text-xl pointer-events-none select-none"
              style={{
                left: `${symbol.x}%`,
                top: `${symbol.y}%`,
                color: symbol.color,
                filter: symbol.isFollowing
                  ? "brightness(1.5) drop-shadow(0 0 6px currentColor)"
                  : "brightness(1)",
                zIndex: symbol.isFollowing ? 20 : 10,
                textShadow: symbol.isFollowing
                  ? "0 0 10px currentColor"
                  : "none",
              }}
              animate={{
                scale: symbol.isFollowing ? 1.3 : 1,
                rotate: symbol.isFollowing ? [0, 10, -10, 0] : [0, 5, -5, 0],
              }}
              transition={{
                duration: symbol.isFollowing ? 0.8 : 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {symbol.symbol}
            </motion.div>
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-green-900/5 via-transparent to-yellow-900/5" />
      </div>

      {/* Content */}
      <div className="relative z-30 text-center px-4 max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
        >
          Hi, I'm{" "}
          <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
            Tufail Ahmed
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-xl md:text-3xl font-semibold mb-8 text-gray-300"
        >
          MERN Stack Developer | React.js & Node.js
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl mb-12 text-gray-400 h-8 flex items-center justify-center"
        >
          <span className="border-r-2 border-blue-400 pr-1 animate-pulse">
            {text}
          </span>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          onClick={scrollToContact}
          className="group relative px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] z-30"
        >
          <span className="relative z-10">Work With Me</span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-blue-400"
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
