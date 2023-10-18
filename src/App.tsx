import { useEffect, useState } from "react";
import { remult } from "remult";
import { Flashcard } from "./shared/Flashcard";
import { FlashcardsController } from "./shared/FlashcardsController";

const FlashcardRepo = remult.repo(Flashcard);

const getRandomFlashcard = async (excludeId?: string) => {
  return FlashcardsController.getRandomFlashcard(excludeId);
};

export default function App() {
  const [Flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    FlashcardRepo.find().then(setFlashcards);
    getRandomFlashcard();
  }, []);
  return (
    <div>
      <h1>Flashcards</h1>
      <main>
        {Flashcards.map((Flashcard) => {
          return (
            <div key={Flashcard.id}>
              <p>{Flashcard.question}</p>
              <p>{Flashcard.answer}</p>
            </div>
          );
        })}
      </main>
    </div>
  );
}
