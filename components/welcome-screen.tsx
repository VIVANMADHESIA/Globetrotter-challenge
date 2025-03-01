"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Globe } from 'lucide-react'

interface WelcomeScreenProps {
  onStartGame: (username: string) => void
}

export default function WelcomeScreen({ onStartGame }: WelcomeScreenProps) {
  const [username, setUsername] = useState("")
  
  return (
    <motion.div 
      className="w-full bg-white rounded-xl shadow-2xl p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center mb-6">
        <div className="bg-blue-500 p-4 rounded-full">
          <Globe className="h-12 w-12 text-white" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-2">The Globetrotter Challenge</h1>
      <p className="text-gray-600 text-center mb-8">
        Test your knowledge of famous destinations around the world!
      </p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Enter your username to begin
          </label>
          <Input
            id="username"
            type="text"
            placeholder="Your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
          />
        </div>
        
        <Button 
          onClick={() => onStartGame(username)}
          className="w-full"
          disabled={!username.trim()}
        >
          Start Game
        </Button>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <p className="text-center">
          Guess destinations from cryptic clues and challenge your friends!
        </p>
      </div>
    </motion.div>
  )
}

