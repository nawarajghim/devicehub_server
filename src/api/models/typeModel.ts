import { model, Schema } from "mongoose";
import { Type } from "../../types/TypeTypes";


const typeSchema = new Schema({
    name: { type: String, required: true },
    type: { type: Array, required: true},
})

export default model<Type>('Type', typeSchema);