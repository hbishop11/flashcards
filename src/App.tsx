import { useCallback, useEffect, useState } from "react";
import { Flashcard } from "./shared/Flashcard";
import { FlashcardsController } from "./shared/FlashcardsController";
import FlippingCard from "./client/FlippingCard";

const getRandomFlashcard = async (excludeId?: string) => {
  return FlashcardsController.getRandomFlashcard(excludeId);
};

const MESSAGES_BY_LANGUAGE = {
  en: {
      startPractice: 'Start prac­tice',
      revealAnswer: '↷ show answer',
      gotItWrong: '😞 got it wrong',
      gotItCorrect: '😃 got it cor­rect',
      noItemsError: 'No flippin’ items found. 😞'
  },
  pl: {
      startPractice: 'Rozpo­cznij naukę',
      revealAnswer: '↷ pokaż odpo­wiedź',
      gotItWrong: '😞 nie wie­działem',
      gotItCorrect: '😃 wie­działem',
      noItemsError: 'Nie znalazłem żadnych elementów do uczenia. 😞'
  }
};

export default function App() {
  const [flippingCard, setFlippingCard] = useState<FlippingCard | null>(null);

  function initCard(flashcardData: Flashcard) {
    const domElement = document.getElementById("root");

    const newCard = new FlippingCard(
      domElement,
      {
        next: () => {
          return { value: flashcardData };
        },
      },
      MESSAGES_BY_LANGUAGE.en
    );

    newCard.onWrongAnswer = newCard.onCorrectAnswer = async () => {
      const flashCard = await getRandomFlashcard();
      const newCard = initCard(flashCard);
      newCard?.appear();
      setFlippingCard(newCard);
    };

    return newCard;
  }

  const showFlashcards = useCallback(async () => {
    const flashCard = await getRandomFlashcard();
    const flippingCard = initCard(flashCard);
    setFlippingCard(flippingCard);
    flippingCard?.appear();
  }, [setFlippingCard]);

  const hideFlashcards = useCallback(() => {
    flippingCard?.disappear();
    setFlippingCard(null);
  }, [flippingCard, setFlippingCard]);

  return (
    <div>
      <h1>Flashcards</h1>
      <main>
        <button onClick={showFlashcards} style={{width: '100%'}}>Start</button>

        <section id="root" className={flippingCard ? "fcard__card__wrapper" : ""}>
          <button className={flippingCard ? "fcard__endPractice" : "hidden"} onClick={hideFlashcards}>
            ❌
          </button>
        </section>
      </main>
    </div>
  );
}
