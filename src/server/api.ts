import { remultExpress } from "remult/remult-express";
import { Flashcard } from "../shared/Flashcard";
import { FlashcardsController } from "../shared/FlashcardsController";

export const api = remultExpress({
  entities: [Flashcard],
  controllers: [FlashcardsController],
});
