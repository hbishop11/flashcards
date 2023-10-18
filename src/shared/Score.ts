import { Entity, Fields, Validators } from "remult";

@Entity("scores", {
  allowApiCrud: true,
})
export class Score {
  @Fields.cuid()
  id = "";

  @Fields.number()
  score = 0;

  @Fields.string({
    validate: Validators.required,
  })
  userId = "Harry";

  @Fields.createdAt()
  createdAt?: Date
}
