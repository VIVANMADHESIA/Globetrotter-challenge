import { NextResponse } from "next/server"
import { users } from "@/lib/data"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id
    const { score } = await request.json()
    
    if (typeof score !== "number") {
      return NextResponse.json(
        { error: "Score must be a number" },
        { status: 400 }
      )
    }
    
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex === -1) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }
    
    // Update user score
    users[userIndex].score = score
    
    return NextResponse.json({
      id: users[userIndex].id,
      username: users[userIndex].username,
      score: users[userIndex].score
    })
  } catch (error) {
    console.error("Error updating score:", error)
    return NextResponse.json(
      { error: "Failed to update score" },
      { status: 500 }
    )
  }
}

