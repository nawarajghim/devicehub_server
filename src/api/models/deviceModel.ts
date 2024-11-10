import { model, Schema } from "mongoose";
import { Device } from "../../types/Device";


const deviceSchema = new Schema<Device>({
    name: { type: String, required: true },
    deviceClass: { type: String, required: true},
    deviceType: { type: String, required: true},
    location: { type: String, required: false},
    settings: { type: String, required: false},
    status: { type: String, required: true},
    data: { type: Object, required: false},
    last_updated: { type: Date, required: false}
})

export default model<Device>('Device', deviceSchema);