import { remultExpress } from "remult/remult-express";
import { Flashcard } from "../shared/Flashcard";
import { Score } from "../shared/Score";
import { FlashcardsController } from "../shared/FlashcardsController";
import { User } from "../shared/User";

export const api = remultExpress({
  entities: [Flashcard, Score, User],
  controllers: [FlashcardsController],
});
