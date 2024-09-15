import { model, Schema } from "mongoose";
import { DeviceData } from "../../types/DeviceData";


const deviceDataSchema = new Schema({
    deviceId: { type: Number, required: true},
    timestamp: { type: String, required: true},
    data: {type: {}, required: true}
})

export default model<DeviceData>('DeviceData', deviceDataSchema);