import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Globe, Server, Database, Coffee } from 'lucide-react';
import { Service } from '../types';
import { staggerContainer, fadeInUp } from '../utils/animations';

const Services: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

const services: Service[] = [
  {
    id: 1,
    title: 'Web App Development',
    description: 'Modern, responsive web applications built with React, Next.js, and cutting-edge frontend technologies.',
    icon: 'Globe'
  },
  {
    id: 2,
    title: 'API Development',
    description: 'RESTful APIs and GraphQL services using Node.js, Express, and Java Spring Boot frameworks.',
    icon: 'Server'
  },
  {
    id: 3,
    title: 'Database Design',
    description: 'Optimized database architecture and design for MongoDB, MySQL, and PostgreSQL databases.',
    icon: 'Database'
  },
  {
    id: 4,
    title: 'Business Website Development',
    description: 'Custom business websites and client solutions with Next.js, React.js, and responsive design for maximum impact.',
    icon: 'Briefcase'
  }
];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-12 h-12" />;
      case 'Server': return <Server className="w-12 h-12" />;
      case 'Database': return <Database className="w-12 h-12" />;
      case 'Coffee': return <Coffee className="w-12 h-12" />;
      default: return <Globe className="w-12 h-12" />;
    }
  };

  return (
    <section id="services" ref={ref} className="py-20 px-4 bg-gray-900 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.1),transparent_70%)]" />
      
      <div className="relative max-w-6xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          Services
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              className="group relative p-8 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-400 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 group-hover:border-blue-400/60 transition-all duration-300">
                    <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                      {getIcon(service.icon)}
                    </div>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;