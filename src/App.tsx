
import { useEffect, useState } from "react"
import { remult } from "remult"
import { Flashcard } from "./shared/Flashcard"

const FlashcardRepo = remult.repo(Flashcard)

export default function App() {
  const [Flashcards, setFlashcards] = useState<Flashcard[]>([])

  useEffect(() => {
    FlashcardRepo.find().then(setFlashcards)
  }, [])
  return (
    <div>
      <h1>Flashcards</h1>
      <main>
        {Flashcards.map(Flashcard => {
          return (
            <div key={Flashcard.id}>
              <p>{Flashcard.question}</p>
              <p>{Flashcard.answer}</p>
            </div>
          )
        })}
      </main>
    </div>
  )
}
