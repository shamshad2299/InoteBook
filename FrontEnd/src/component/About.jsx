import React from "react";
import { 
  FaShieldAlt, 
  FaLock, 
  FaCloud, 
  FaUserPlus, 
  FaAward, 
  FaRocket,
  FaQuoteLeft,
  FaStar
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function About() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // Features data
  const features = [
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Bank-Level Security",
      description: "Your data is protected with enterprise-grade encryption protocols."
    },
    {
      icon: <FaCloud className="text-3xl" />,
      title: "Cloud Storage",
      description: "Access your notes from anywhere, on any device, at any time."
    },
    {
      icon: <FaUserPlus className="text-3xl" />,
      title: "Multiple Accounts",
      description: "Create separate accounts for personal, work, and other needs."
    },
    {
      icon: <FaLock className="text-3xl" />,
      title: "Complete Privacy",
      description: "We never share or sell your data to third parties."
    }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "Software Developer",
      text: "This platform has completely transformed how I organize my project notes and ideas.",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      role: "Research Scholar",
      text: "The security features give me peace of mind when storing my research materials.",
      rating: 4
    },
    {
      name: "James Wilson",
      role: "Business Consultant",
      text: "I use this for all my client notes. The multiple account feature is perfect for keeping things separate.",
      rating: 5
    }
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative flex items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.05)_0px,transparent_50px)] bg-[length:50px_50px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex justify-center"
          >
            <motion.div variants={itemVariants} className="w-full md:w-2/3 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About SecureNotes</h1>
              <p className="text-xl mb-6">
                A premium platform for storing your personal notes and information with military-grade security
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Get Started
                </button>
                <button className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
                  Learn More
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden rotate-180">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" className="relative block w-full h-24">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-100"></path>
          </svg>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex flex-col md:flex-row items-center"
          >
            <motion.div variants={itemVariants} className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Hello! I'm Shamshad Ahmad</h2>
              <p className="text-xl text-gray-900 mb-4">
                I created SecureNotes to provide a safe, reliable space for people to store their important information without worrying about privacy or security breaches.
              </p>
              <p className="text-gray-600">
                With a background in software development and cybersecurity, I've built this platform to meet the highest standards of data protection while maintaining an intuitive user experience.
              </p>
              <div className="flex mt-6 flex-wrap">
                <div className="mr-8 mb-4">
                  <h4 className="font-bold text-2xl text-blue-600">5000+</h4>
                  <p className="text-gray-600">Active Users</p>
                </div>
                <div className="mr-8 mb-4">
                  <h4 className="font-bold text-2xl text-blue-600">99.9%</h4>
                  <p className="text-gray-600">Uptime</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-bold text-2xl text-blue-600">100%</h4>
                  <p className="text-gray-600">Secure</p>
                </div>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="w-full md:w-1/2">
              <div 
                className="h-96 rounded-2xl shadow-lg bg-cover bg-center"
                style={{
                  backgroundImage: "url(https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=800&q=80)"
                }}
              ></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4 text-gray-900">Why Choose SecureNotes?</motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600">Your data's security is our top priority</motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="w-full"
              >
                <div className="text-center p-6 h-full rounded-2xl shadow-sm border-0 bg-gray-50 hover:shadow-md transition-shadow">
                  <div className="mb-4 text-blue-600 flex justify-center">
                    {feature.icon}
                  </div>
                  <h5 className="font-bold text-lg mb-2 text-gray-900">{feature.title}</h5>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Focus Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div 
                className="h-96 rounded-2xl shadow-lg bg-cover bg-center"
                style={{
                  backgroundImage: "url(https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80)"
                }}
              ></div>
            </motion.div>
            <motion.div 
              className="w-full md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Advanced Security Measures</h2>
              <p className="mb-6 text-gray-600">
                We understand that your notes contain sensitive information, which is why we've implemented multiple layers of security to keep your data safe from unauthorized access.
              </p>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="mr-4 text-blue-600">
                    <FaAward className="text-2xl" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1 text-gray-900">End-to-End Encryption</h5>
                    <p className="text-gray-600">Your data is encrypted before it leaves your device</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="mr-4 text-blue-600">
                    <FaLock className="text-2xl" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1 text-gray-900">Two-Factor Authentication</h5>
                    <p className="text-gray-600">Add an extra layer of security to your account</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-xl shadow-sm">
                  <div className="mr-4 text-blue-600">
                    <FaRocket className="text-2xl" />
                  </div>
                  <div>
                    <h5 className="font-bold mb-1 text-gray-900">Regular Security Audits</h5>
                    <p className="text-gray-600">We continuously test and improve our security measures</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-4 text-gray-900">What Our Users Say</motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600">Join thousands of satisfied users who trust us with their data</motion.p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="w-full"
              >
                <div className="h-full p-6 rounded-2xl bg-white shadow-sm">
                  <div className="text-blue-600 mb-4">
                    <FaQuoteLeft className="text-2xl" />
                  </div>
                  <p className="italic mb-6 text-gray-900">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <div>
                      <h6 className="font-bold text-gray-900">{testimonial.name}</h6>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                    <div className="ml-auto flex">
                      {[...Array(5)].map((_, i) => (
                        <FaStar 
                          key={i} 
                          className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} 
                          size={16} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Notes?</h2>
            <p className="text-xl mb-8">Join our community of users who value privacy and security</p>
            <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}