import { useCallback, useEffect, useState } from "react";
import { Flashcard } from "./shared/Flashcard";
import { FlashcardsController } from "./shared/FlashcardsController";
import FlippingCard from "./client/FlippingCard";
import { Score } from "./shared/Score";
import { remult } from "remult";

const scoreRepo = remult.repo(Score)

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
  const [scores, setScores] = useState<Score[]>([])
  const [currentUser, setCurrentUser] = useState<Score>();

  useEffect(() => {
    scoreRepo.find().then((info) => {
      // console.log('info.applyChanges', info.applyChanges)
      setScores(info)
    })

    const currentUser = scores.find(score => score.userId === 'Harry')
    setCurrentUser(currentUser)
  }, [setCurrentUser, setScores])

  const incremementScore = async () => {
    const scores = await scoreRepo.find()

    const currentUser = scores.find(score => score.userId === 'Harry')
    setCurrentUser(currentUser)
    console.log('currentUser', currentUser)

    if (!currentUser) {
      return scoreRepo.insert({
        userId: 'Harry',
        score: 1
      })
    }

    const newScore = currentUser.score + 1

    const newResult = await scoreRepo.save({
      ...currentUser,
      score: newScore
    })

    console.log('new score: ', newResult.score)

    setCurrentUser(newResult)
    setScores(scores.map(score => {
      if (score.userId === currentUser.userId) {
        return newResult
      }
      return score
    }))

    await scoreRepo.find().then((response) => {
      console.log('response: ', response)
      setScores(response)
    })
  }

  const onWrongAnswer = useCallback(() => {
    initCard({ onWrongAnswer, onCorrectAnswer });
  }, [setFlippingCard, incremementScore])

  const onCorrectAnswer = useCallback(() => {
    initCard({ onWrongAnswer, onCorrectAnswer });
    incremementScore()
  }, [setFlippingCard, incremementScore])

  const initCard = useCallback(async ({ onWrongAnswer, onCorrectAnswer }: any) => {
    const flashCardData = await getRandomFlashcard();

    const domElement = document.getElementById("root");

    const newCard = new FlippingCard(
      domElement,
      {
        next: () => {
          return { value: flashCardData };
        },
      },
      MESSAGES_BY_LANGUAGE.en
    );

    newCard.onWrongAnswer = async () => {
      onWrongAnswer()
    };

    newCard.onCorrectAnswer = async () => {
      onCorrectAnswer()
    };

    newCard.appear()

    setFlippingCard(newCard);
  }, [incremementScore, setFlippingCard, flippingCard, scores])

  const showFlashcards = useCallback(async () => {
    initCard({ onWrongAnswer, onCorrectAnswer });
  }, [initCard]);

  const hideFlashcards = useCallback(() => {
    flippingCard?.disappear();
    setFlippingCard(null);
  }, [flippingCard, setFlippingCard]);

  return (
    <div>
      <h1>Flashcards</h1>
      <main>
        <button onClick={showFlashcards} style={{width: '100%'}}>Start</button>

        <Leaderboard scores={scores}/>

        <section id="root" className={flippingCard ? "fcard__card__wrapper" : ""}>
          <button className={flippingCard ? "fcard__endPractice" : "hidden"} onClick={hideFlashcards}>
            ❌
          </button>
        </section>
      </main>
    </div>
  );
}

const Leaderboard = ({ scores }: { scores: any[] }) => {
  const scoresList = scores.map((score, index) => (
    <li key={index}>{score.userId} : {score.score}</li>
  ))
  return (
    <>
      <h2>Leaderboard</h2>
      <ol>
        {scoresList}
      </ol>
    </>
  )
}