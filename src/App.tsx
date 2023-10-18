import { useCallback, useEffect, useState } from "react";
import { Flashcard } from "./shared/Flashcard";
import { FlashcardsController } from "./shared/FlashcardsController";
import FlippingCard from "./client/FlippingCard";

const getRandomFlashcard = async (excludeId?: string) => {
  return FlashcardsController.getRandomFlashcard(excludeId);
};

export default function App() {
  const [Flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [flippingCard, setFlippingCard] = useState<FlippingCard | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);

  // useEffect(() => {
  //   FlashcardRepo.find().then(setFlashcards);
  // }, []);

  function initCard(flashcardData: Flashcard) {
    const domElement = document.getElementById("root");

    const newCard = new FlippingCard(
      domElement,
      {
        next: () => {
          return { value: flashcardData };
        },
      },
      []
    );

    newCard.onWrongAnswer = newCard.onCorrectAnswer = async () => {
      const flashCard = await getRandomFlashcard();
      // console.log("on correct!");
      // setCardIndex(cardIndex + 1);

      const newCard = initCard(flashCard);

      newCard?.appear();
    };

    return newCard;
  }

  const showFlashcards = useCallback(async () => {
    const flashCard = await getRandomFlashcard();
    const flippingCard = initCard(flashCard);

    setFlippingCard(flippingCard);
    flippingCard?.appear();
    setIsFlipping(true);
  }, [Flashcards, setFlippingCard]);

  const hideFlashcards = useCallback(() => {
    setFlippingCard(null);
    setIsFlipping(false);
  }, [setFlippingCard, setIsFlipping]);

  return (
    <div>
      <h1>Flashcards</h1>
      <main>
        <button onClick={showFlashcards}>Start</button>

        <section id="root" className={isFlipping ? "fcard__card__wrapper" : ""}>
          <button className="fcard__endPractice" onClick={hideFlashcards}>
            ❌
          </button>
        </section>
        {/* {Flashcards.map(Flashcard => {
          return (
            <div key={Flashcard.id}>
              <p>{Flashcard.question}</p>
              <p>{Flashcard.answer}</p>
            </div>
          )
        })} */}
      </main>
    </div>
  );
}
