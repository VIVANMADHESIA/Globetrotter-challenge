import { NextResponse } from "next/server"
import { users } from "@/lib/data"

export async function POST(request: Request) {
  try {
    const { username } = await request.json()
    
    if (!username || typeof username !== "string") {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      )
    }
    
    // Check if user already exists
    let user = users.find(u => u.username.toLowerCase() === username.toLowerCase())
    
    if (!user) {
      // Create new user
      user = {
        id: `user_${Date.now()}`,
        username,
        score: 0,
        createdAt: new Date().toISOString()
      }
      users.push(user)
    }
    
    return NextResponse.json({
      id: user.id,
      username: user.username,
      score: user.score
    })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    )
  }
}

