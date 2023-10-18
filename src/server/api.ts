import { remultExpress } from 'remult/remult-express';
import { Flashcard } from '../shared/Flashcard';

export const api = remultExpress({
    entities: [Flashcard]
})
