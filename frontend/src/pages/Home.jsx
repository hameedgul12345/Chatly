"use client";
import React from "react";
import Layout from "../components/Layout";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { FaComments, FaUserFriends } from "react-icons/fa";
import { IoMdChatbubbles } from "react-icons/io";

function Home() {
  return (
    <Layout>
      {/* Wrapper */}
      <div className="flex w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500">

        {/* Sidebar (hidden on mobile inside Layout if already handled there) */}
        <aside className="hidden md:block">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 py-16 md:py-8 text-center">

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-2xl"
          >
            {/* Heading */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-lg">
                <IoMdChatbubbles className="text-white text-2xl sm:text-3xl" />
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">
                Welcome to <span className="text-blue-600">Chatly</span>
              </h1>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed">
              Connect with your friends and teams in real time. Chatly makes
              messaging, file sharing, and collaboration simple, fast, and secure.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto px-6 py-3 rounded-full shadow-md font-medium transition-all"
              >
                Start Chatting
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 w-full sm:w-auto px-6 py-3 rounded-full shadow-md font-medium transition-all"
              >
                View Contacts
              </motion.button>
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl px-2"
          >
            {/* Card */}
            <FeatureCard
              icon={<FaComments />}
              title="Real-Time Messaging"
              text="Stay connected with instant messaging powered by Socket.IO."
              color="text-blue-500"
            />

            <FeatureCard
              icon={<FaUserFriends />}
              title="Group Chats"
              text="Create private or public chat rooms for your friends or teams."
              color="text-purple-500"
            />

            <FeatureCard
              icon={<IoMdChatbubbles />}
              title="Media Sharing"
              text="Send images, voice notes, and files seamlessly within chats."
              color="text-green-500"
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;


/* Card Component */
function FeatureCard({ icon, title, text, color }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-5 hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col items-center text-center">
        <div className={`${color} text-3xl mb-3`}>{icon}</div>
        <h3 className="font-semibold text-base sm:text-lg text-gray-800 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
          {text}
        </p>
      </div>
    </div>
  );
}
