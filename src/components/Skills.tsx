import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Skill } from '../types';
import { staggerContainer, fadeInUp } from '../utils/animations';

const Skills: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const skills: Skill[] = [
    { 
      name: 'React.js', 
      level: 95, 
      category: 'frontend',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'
    },
    { 
      name: 'Next.js', 
      level: 90, 
      category: 'frontend',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg'
    },
    { 
      name: 'Node.js', 
      level: 92, 
      category: 'backend',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'
    },
    { 
      name: 'Express.js', 
      level: 88, 
      category: 'backend',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg'
    },
    { 
      name: 'MongoDB', 
      level: 85, 
      category: 'database',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg'
    },
    { 
      name: 'MySQL', 
      level: 87, 
      category: 'database',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'
    },
    { 
      name: 'Java', 
      level: 90, 
      category: 'language',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'
    },
    { 
      name: 'TypeScript', 
      level: 88, 
      category: 'language',
      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg'
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend': return 'from-blue-500 to-cyan-400';
      case 'backend': return 'from-purple-500 to-pink-400';
      case 'database': return 'from-green-500 to-emerald-400';
      case 'language': return 'from-orange-500 to-red-400';
      default: return 'from-blue-500 to-cyan-400';
    }
  };

  return (
    <section id="skills" ref={ref} className="py-20 px-4 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-50" />
      
      <div className="relative max-w-6xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          Technical Skills
        </motion.h2>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={fadeInUp}
              className="group relative p-6 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-blue-400 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="w-10 h-10" 
                />
                <span className="text-2xl font-bold text-white">{skill.level}%</span>
              </div>
              
              <h3 className="text-white font-semibold mb-4">{skill.name}</h3>
              
              <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`absolute top-0 left-0 h-full bg-gradient-to-r ${getCategoryColor(skill.category)} rounded-full`}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }}
                />
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
