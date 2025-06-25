import mongoose, {model, Schema} from 'mongoose';
import {Ruuvi} from '../../types/Ruuvi';

const deviceDataSchema = new Schema({
  data: {
    humidity: {type: Number, required: true},
    temperature: {type: Number, required: true},
    pressure: {type: Number},
    mac: {type: String, required: true},
  },
  device: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    required: true,
  },
  timestamp: {type: Date, default: Date.now},
});
export default model<Ruuvi>('deviceDataDetails', deviceDataSchema);
