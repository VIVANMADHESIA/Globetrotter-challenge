"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Confetti } from "@/components/confetti"
import GameScreen from "@/components/game-screen"
import WelcomeScreen from "@/components/welcome-screen"
import FriendChallengeScreen from "@/components/friend-challenge-screen"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const challengerId = searchParams.get("challengerId")
  
  const [username, setUsername] = useState("")
  const [userId, setUserId] = useState("")
  const [gameStarted, setGameStarted] = useState(false)
  const [showChallenge, setShowChallenge] = useState(false)
  const [score, setScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [challengerInfo, setChallengerInfo] = useState<{username: string, score: number} | null>(null)

  useEffect(() => {
    // Check if this is a challenge link
    if (challengerId) {
      fetchChallengerInfo(challengerId)
    }
    
    // Restore user session if exists
    const savedUsername = localStorage.getItem("globetrotter_username")
    const savedUserId = localStorage.getItem("globetrotter_userId")
    if (savedUsername && savedUserId) {
      setUsername(savedUsername)
      setUserId(savedUserId)
    }
  }, [challengerId])

  const fetchChallengerInfo = async (id: string) => {
    try {
      const response = await fetch(`/api/users/${id}`)
      if (response.ok) {
        const data = await response.json()
        setChallengerInfo({
          username: data.username,
          score: data.score
        })
      }
    } catch (error) {
      console.error("Failed to fetch challenger info:", error)
    }
  }

  const handleStartGame = async (name: string) => {
    if (!name.trim()) return
    
    try {
      // Register user or get existing user
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setUserId(data.id)
        setUsername(name)
        setGameStarted(true)
        
        // Save to local storage
        localStorage.setItem("globetrotter_username", name)
        localStorage.setItem("globetrotter_userId", data.id)
      }
    } catch (error) {
      console.error("Failed to register user:", error)
    }
  }

  const handleCorrectAnswer = () => {
    setShowConfetti(true)
    setScore(prev => prev + 1)
    
    // Update score in database
    updateScore(score + 1)
    
    setTimeout(() => {
      setShowConfetti(false)
    }, 3000)
  }
  
  const updateScore = async (newScore: number) => {
    if (!userId) return
    
    try {
      await fetch(`/api/users/${userId}/score`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score: newScore }),
      })
    } catch (error) {
      console.error("Failed to update score:", error)
    }
  }
  
  const handleChallengeClick = () => {
    setShowChallenge(true)
  }
  
  const handleBackToGame = () => {
    setShowChallenge(false)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-gradient-to-b from-blue-50 to-blue-100">
      {showConfetti && <Confetti />}
      
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          The Globetrotter Challenge
        </p>
      </div>

      <div className="relative flex place-items-center w-full max-w-3xl">
        {!gameStarted ? (
          challengerInfo ? (
            <FriendChallengeScreen 
              challengerName={challengerInfo.username}
              challengerScore={challengerInfo.score}
              onStartGame={handleStartGame}
            />
          ) : (
            <WelcomeScreen onStartGame={handleStartGame} />
          )
        ) : showChallenge ? (
          <div className="w-full bg-white rounded-xl shadow-2xl p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">Challenge a Friend</h2>
            <p className="mb-4">Share this link with your friends to challenge them to beat your score of {score}!</p>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-4 break-all">
              {`${window.location.origin}?challengerId=${userId}`}
            </div>
            
            <div className="flex justify-between">
              <Button 
                onClick={handleBackToGame}
                variant="outline"
              >
                Back to Game
              </Button>
              
              <Button
                onClick={() => {
                  const url = `https://wa.me/?text=Can%20you%20beat%20my%20score%20of%20${score}%20in%20the%20Globetrotter%20Challenge?%20Play%20here:%20${encodeURIComponent(`${window.location.origin}?challengerId=${userId}`)}`
                  window.open(url, '_blank')
                }}
              >
                Share on WhatsApp
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex justify-between items-center mb-4">
              <div className="bg-white px-4 py-2 rounded-lg shadow">
                <span className="font-bold">Player:</span> {username}
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow">
                <span className="font-bold">Score:</span> {score}
              </div>
            </div>
            
            <GameScreen 
              onCorrectAnswer={handleCorrectAnswer} 
              onChallengeClick={handleChallengeClick}
            />
          </div>
        )}
      </div>
    </main>
  )
}

