import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const Footer: React.FC = () => {
  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/tufailahmedsagar/tufailahmedsagar",
      label: "GitHub",
      color: "hover:text-gray-400",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/tufail-ahmed-928b29257",
      label: "LinkedIn",
      color: "hover:text-blue-400",
    },
    {
      icon: Mail,
      href: "mailto:tufailahmedsagar951@gmail.com",
      label: "Email",
      color: "hover:text-green-400",
    },
    {
      icon: ExternalLink,
      href: "https://www.fiverr.com/s/42V7QXx",
      label: "Fiverr",
      color: "hover:text-purple-400",
    },
  ];

  return (
    <footer className="py-12 px-4 bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Tufail Ahmed
            </h3>
            <p className="text-gray-400 mt-2">
              MERN Stack Developer | React.js & Node.js
            </p>
          </div>

          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-500 ${link.color} transition-all duration-300 transform hover:scale-110`}
                whileHover={{
                  scale: 1.2,
                  filter: "drop-shadow(0 0 10px currentColor)",
                }}
                whileTap={{ scale: 0.9 }}
              >
                <link.icon className="w-6 h-6" />
                <span className="sr-only">{link.label}</span>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            © 2025 Tufail Ahmed. All rights reserved. Built with React &
            Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
