// import React from 'react'
// import Layout from '../components/Layout'
// import Sidebar from '../components/Sidebar'

// function Home() {
//   return (
//   <Layout>
//    <h1>helll</h1>
//   </Layout>
//   )
// }

// export default Home;
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
      <div className="flex md:w-[100%] h-[90vh] md:mt-4 mt-24 bg-gray-50 dark:bg-gray-900 transition-all duration-500">
        {/* Sidebar Section */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            {/* Title with Icon beside */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-lg">
                <IoMdChatbubbles className="text-white text-3xl" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">
                Welcome to <span className="text-blue-600">Chatly</span>
              </h1>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              Connect with your friends and teams in real time. Chatly makes
              messaging, file sharing, and collaboration simple, fast, and
              secure — designed for modern communication.
            </p>

            <div className="mt-8 flex justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md font-medium transition-all"
              >
                Start Chatting
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-full shadow-md font-medium transition-all"
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
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl"
          >
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <FaComments className="text-blue-500 text-3xl mb-3" />
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">
                  Real-Time Messaging
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Stay connected with instant messaging powered by Socket.IO.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <FaUserFriends className="text-purple-500 text-3xl mb-3" />
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">
                  Group Chats
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Create private or public chat rooms for your friends or teams.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300">
              <div className="flex flex-col items-center text-center">
                <IoMdChatbubbles className="text-green-500 text-3xl mb-3" />
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 mb-2">
                  Media Sharing
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Send images, voice notes, and files seamlessly within chats.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
