// This is a mock database for the demo
// In a real application, you would use a proper database like MongoDB

export interface Destination {
  id: string
  name: string
  clues: string[]
  funFacts: string[]
}

export interface User {
  id: string
  username: string
  score: number
  createdAt: string
}

// Sample destinations data
export const destinations: Destination[] = [
  {
    id: "dest_1",
    name: "Paris",
    clues: [
      "This city is known as the 'City of Light'",
      "It has a famous iron tower that was built for a World's Fair"
    ],
    funFacts: [
      "The Eiffel Tower was originally intended to be a temporary structure",
      "Paris has over 470 parks and gardens",
      "The Louvre is the world's largest art museum"
    ]
  },
  {
    id: "dest_2",
    name: "Rome",
    clues: [
      "This city is built on seven hills",
      "It was the center of a vast ancient empire"
    ],
    funFacts: [
      "The Colosseum could hold up to 80,000 spectators",
      "People throw about €1.5 million into the Trevi Fountain each year",
      "It's home to the smallest country in the world"
    ]
  },
  {
    id: "dest_3",
    name: "Tokyo",
    clues: [
      "This city is the most populous metropolitan area in the world",
      "It has the world's busiest pedestrian crossing"
    ],
    funFacts: [
      "It has over 200 underground shopping malls",
      "There are more Michelin-starred restaurants here than in any other city",
      "Its subway system carries over 8 million passengers daily"
    ]
  },
  {
    id: "dest_4",
    name: "New York City",
    clues: [
      "This city is nicknamed 'The Big Apple'",
      "It has a famous statue that was a gift from France"
    ],
    funFacts: [
      "More than 800 languages are spoken in this city",
      "The subway system has 472 stations",
      "Central Park was the first public landscaped park in the United States"
    ]
  },
  {
    id: "dest_5",
    name: "Sydney",
    clues: [
      "This city has a famous opera house with a unique sail design",
      "It's the largest city in Australia"
    ],
    funFacts: [
      "The Sydney Harbour Bridge is the world's largest steel arch bridge",
      "The Opera House has over one million roof tiles",
      "Bondi Beach is one of the most famous beaches in the world"
    ]
  }
]

// Sample users data
export const users: User[] = []

