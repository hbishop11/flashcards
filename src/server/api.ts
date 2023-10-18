import { remultExpress } from "remult/remult-express";
import { Flashcard } from "../shared/Flashcard";
import { Score } from "../shared/Score";
import { FlashcardsController } from "../shared/FlashcardsController";

export const api = remultExpress({
  entities: [Flashcard, Score],
  controllers: [FlashcardsController],
});
