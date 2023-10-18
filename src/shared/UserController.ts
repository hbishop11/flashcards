import { BackendMethod, remult } from "remult";
import { User } from "./User";

export class UsersController {
  @BackendMethod({ allowed: true })
  static async signIn(name: string) {
    const userRepo = remult.repo(User);
    const user = await userRepo.findFirst({ name });
    return user;
  }
}
