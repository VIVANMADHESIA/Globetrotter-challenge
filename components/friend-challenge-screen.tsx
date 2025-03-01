"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trophy } from 'lucide-react'

interface FriendChallengeScreenProps {
  challengerName: string
  challengerScore: number
  onStartGame: (username: string) => void
}

export default function FriendChallengeScreen({ 
  challengerName, 
  challengerScore,
  onStartGame 
}: FriendChallengeScreenProps) {
  const [username, setUsername] = useState("")
  
  return (
    <motion.div 
      className="w-full bg-white rounded-xl shadow-2xl p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center mb-6">
        <div className="bg-orange-500 p-4 rounded-full">
          <Trophy className="h-12 w-12 text-white" />
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-center mb-2">Challenge Accepted?</h1>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-center font-medium">
          <span className="font-bold text-blue-600">{challengerName}</span> has challenged you to beat their score of <span className="font-bold text-blue-600">{challengerScore}</span>!
        </p>
      </div>
      
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
          Accept Challenge
        </Button>
      </div>
    </motion.div>
  )
}

