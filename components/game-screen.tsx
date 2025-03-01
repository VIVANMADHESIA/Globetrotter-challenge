"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Frown, Smile, Share2 } from 'lucide-react'

interface GameScreenProps {
  onCorrectAnswer: () => void
  onChallengeClick: () => void
}

interface Destination {
  id: string
  name: string
  clues: string[]
  funFacts: string[]
  options: string[]
}

export default function GameScreen({ onCorrectAnswer, onChallengeClick }: GameScreenProps) {
  const [destination, setDestination] = useState<Destination | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [funFact, setFunFact] = useState<string | null>(null)
  
  useEffect(() => {
    fetchRandomDestination()
  }, [])
  
  const fetchRandomDestination = async () => {
    setLoading(true)
    setSelectedAnswer(null)
    setIsCorrect(null)
    setFunFact(null)
    
    try {
      const response = await fetch("/api/destinations/random")
      if (response.ok) {
        const data = await response.json()
        setDestination(data)
      }
    } catch (error) {
      console.error("Failed to fetch destination:", error)
    } finally {
      setLoading(false)
    }
  }
  
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
    
    if (destination) {
      const correct = answer === destination.name
      setIsCorrect(correct)
      
      // Get a random fun fact
      const randomFact = destination.funFacts[Math.floor(Math.random() * destination.funFacts.length)]
      setFunFact(randomFact)
      
      if (correct) {
        onCorrectAnswer()
      }
    }
  }
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  
  if (!destination) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500">Failed to load destination. Please try again.</p>
        <Button onClick={fetchRandomDestination} className="mt-4">Retry</Button>
      </div>
    )
  }
  
  return (
    <Card className="w-full bg-white rounded-xl shadow-xl p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Guess the Destination</h2>
        <div className="space-y-2">
          {destination.clues.map((clue, index) => (
            <p key={index} className="bg-blue-50 p-3 rounded-lg text-gray-800">
              {clue}
            </p>
          ))}
        </div>
      </div>
      
      {isCorrect === null ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {destination.options.map((option) => (
            <Button
              key={option}
              variant="outline"
              className="h-auto py-3 text-left justify-start"
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </Button>
          ))}
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'} flex items-start gap-3`}>
              {isCorrect ? (
                <Smile className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
              ) : (
                <Frown className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
              )}
              <div>
                <p className={`font-bold ${isCorrect ? 'text-green-700' : 'text-red-700'} mb-1`}>
                  {isCorrect ? 'Correct!' : 'Incorrect!'}
                </p>
                <p className="text-gray-700">
                  {isCorrect 
                    ? `You guessed it right! The answer is ${destination.name}.` 
                    : `The correct answer is ${destination.name}.`}
                </p>
                {funFact && (
                  <div className="mt-3 bg-white p-3 rounded border">
                    <p className="font-medium mb-1">Fun Fact:</p>
                    <p>{funFact}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      
      <div className="flex justify-between">
        {isCorrect !== null && (
          <Button onClick={fetchRandomDestination}>
            Next Destination
          </Button>
        )}
        
        <Button 
          variant="outline" 
          className="ml-auto flex items-center gap-2"
          onClick={onChallengeClick}
        >
          <Share2 className="h-4 w-4" />
          Challenge a Friend
        </Button>
      </div>
    </Card>
  )
}

