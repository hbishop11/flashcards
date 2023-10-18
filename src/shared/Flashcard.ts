import { Entity, Fields, Validators } from "remult";

@Entity("flashcards", {
  allowApiCrud: true,
})
export class Flashcard {
  @Fields.autoIncrement()
  id = "";

  @Fields.string({
    validate: Validators.required,
  })
  question = "";

  @Fields.string({
    validate: Validators.required,
  })
  answer = "";

  @Fields.string({
    validate: Validators.required,
  })
  questionLanguage = "de";

  @Fields.string({
    validate: Validators.required,
  })
  answerLanguage = "en";
}
