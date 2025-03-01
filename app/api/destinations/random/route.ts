import { NextResponse } from "next/server"
import { destinations } from "@/lib/data"

export async function GET() {
  try {
    // Get a random destination
    const randomIndex = Math.floor(Math.random() * destinations.length)
    const destination = destinations[randomIndex]
    
    // Get 3 random options that are not the correct answer
    const otherOptions = destinations
      .filter(d => d.id !== destination.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(d => d.name)
    
    // Add the correct answer and shuffle
    const options = [...otherOptions, destination.name].sort(() => 0.5 - Math.random())
    
    return NextResponse.json({
      ...destination,
      options
    })
  } catch (error) {
    console.error("Error fetching random destination:", error)
    return NextResponse.json(
      { error: "Failed to fetch random destination" },
      { status: 500 }
    )
  }
}

