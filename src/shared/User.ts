import { Entity, Fields, Validators } from "remult";

@Entity("users", {
  allowApiCrud: true,
})
export class User {
  @Fields.autoIncrement()
  id = 0;

  @Fields.string({
    validate: [Validators.required, Validators.unique],
  })
  name = "";

  @Fields.number()
  attempts = 0;

  @Fields.number()
  correctAnswers = 0;
}
