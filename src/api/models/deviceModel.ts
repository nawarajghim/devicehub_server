import { model, Schema } from "mongoose";
import { Device } from "../../types/Device";


const deviceSchema = new Schema<Device>({
    name: { type: String, required: true },
    type: { type: String, required: true},
    location: { type: String, required: false},
    settings: { type: String, required: false},
})

export default model<Device>('Device', deviceSchema);