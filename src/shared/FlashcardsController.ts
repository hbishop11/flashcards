import { BackendMethod, remult } from "remult";
import { Flashcard } from "./Flashcard";

const getRandomNumberInRangeWithExclusion = (
  min: number,
  max: number,
  excluded?: number
) => {
  let randomNum;

  do {
    randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (randomNum === excluded);

  return randomNum;
};

export class FlashcardsController {
  @BackendMethod({ allowed: true })
  static async getRandomFlashcard(excludeId?: string) {
    const flashcardRepo = remult.repo(Flashcard);
    const totalCount = await flashcardRepo.count();
    const randomSelection = getRandomNumberInRangeWithExclusion(
      0,
      totalCount - 1,
      excludeId ? parseInt(excludeId) : -1 // TODO do better than this
    );

    return flashcardRepo.findFirst({
      id: String(randomSelection),
    });
  }
}
