import { remultExpress } from "remult/remult-express";
import { Flashcard } from "../shared/Flashcard";
import { FlashcardsController } from "../shared/FlashcardsController";
import { User } from "../shared/User";
import { UsersController } from "../shared/UserController";

export const api = remultExpress({
  entities: [Flashcard, User],
  controllers: [FlashcardsController, UsersController],
  getUser: (req) => req.session!?.["user"],
});
