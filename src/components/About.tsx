import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { fadeInLeft, fadeInRight } from "../utils/animations";

const About: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section id="about" ref={ref} className="py-20 px-4 bg-gray-900 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={fadeInLeft}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="w-80 h-80 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1 hover:from-blue-400 hover:to-purple-500 transition-all duration-300">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                  <img
                    src="https://res.cloudinary.com/drpizndwi/image/upload/v1757672715/CEO_of_HafizSagarTech_s6flig.png"
                    alt="Tufail Ahmed"
                    className="w-72 h-72 rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
            </div>
          </motion.div>

          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Passionate Full Stack Developer
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              I build modern, scalable, and responsive web applications using
              React.js, Next.js, Node.js, Express.js, MongoDB, and MySQL. With a
              strong foundation in Java, OOP, and Spring Boot, I transform
              complex requirements into efficient and user-friendly digital
              solutions.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              I have delivered high-quality projects for clients and businesses,
              from RESTful APIs and database design to responsive user
              interfaces. I am passionate about continuous learning and creating
              impactful web solutions that help clients succeed in the digital
              world.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                "React.js & Next.js",
                "Node.js & Express.js",
                "MongoDB & MySQL",
                "Java & Spring Boot",
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-gray-300">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
