import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as Lucide from 'lucide-react';

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  
  // User data
  const user = {
    name: "Alexandra Chen",
    role: "Senior Product Designer",
    location: "San Francisco, CA",
    bio: "Passionate about creating beautiful, functional interfaces that solve real problems. Love hiking and photography in my free time.",
    stats: {
      posts: 247,
      followers: 3842,
      following: 527
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Profile Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/20"
        >
          {/* Profile Header with Gradient */}
          <div className="h-32 bg-gradient-to-r from-purple-500 to-indigo-600 relative">
            {/* Edit cover photo button */}
            <button className="absolute top-4 right-4 bg-white/20 text-white p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-all">
              <Lucide.Camera className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Content */}
          <div className="px-8 pb-8 -mt-16">
            {/* Avatar */}
            <motion.div
              variants={itemVariants}
              className="relative"
            >
              <div className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg mx-auto relative">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
                {/* Online status indicator */}
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              
              {/* Edit avatar button */}
              <button className="absolute bottom-2 right-1/2 transform translate-x-12 bg-white shadow-md p-2 rounded-full text-gray-700 hover:shadow-lg hover:text-purple-600 transition-all">
                <Lucide.Edit3 className="w-4 h-4" />
              </button>
            </motion.div>

            {/* User Info */}
            <motion.div variants={itemVariants} className="text-center mt-6">
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-purple-600 font-medium mt-1">{user.role}</p>
              <div className="flex items-center justify-center mt-2 text-gray-600">
                <Lucide.MapPin className="w-4 h-4 mr-1" />
                <span>{user.location}</span>
              </div>
              <p className="text-gray-600 mt-4 leading-relaxed max-w-md mx-auto">{user.bio}</p>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{user.stats.posts}</div>
                <div className="text-gray-600 text-sm">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{user.stats.followers}</div>
                <div className="text-gray-600 text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">{user.stats.following}</div>
                <div className="text-gray-600 text-sm">Following</div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <Lucide.Edit3 className="w-5 h-5" />
                <span>Edit Profile</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 bg-white text-gray-800 border border-gray-200 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <Lucide.MessageCircle className="w-5 h-5" />
                <span>Message</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsFollowing(!isFollowing)}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all ${
                  isFollowing 
                    ? 'bg-gray-100 text-gray-800 border border-gray-200' 
                    : 'bg-gradient-to-r from-rose-500 to-pink-600 text-white'
                }`}
              >
                {isFollowing ? (
                  <>
                    <Lucide.Check className="w-5 h-5" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <Lucide.Plus className="w-5 h-5" />
                    <span>Follow</span>
                  </>
                )}
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="flex justify-center gap-4 mt-6">
              {[
                { icon: Lucide.Twitter, color: 'text-blue-400' },
                { icon: Lucide.Instagram, color: 'text-pink-500' },
                { icon: Lucide.Linkedin, color: 'text-blue-600' },
                { icon: Lucide.Github, color: 'text-gray-800' }
              ].map((SocialIcon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-all ${SocialIcon.color}`}
                >
                  <SocialIcon.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Profile;