import { Entity, Fields } from "remult"

@Entity("flashcards", {
  allowApiCrud: true
})
export class Flashcard {
  @Fields.cuid()
  id = ""

  @Fields.string()
  question = ""

  @Fields.string()
  answer = ""

  @Fields.string()
  questionLanguage = "de"

  @Fields.string()
  answerLanguage = "en"
}
