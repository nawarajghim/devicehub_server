import {model, Schema} from 'mongoose';
import {Ruuvi} from '../../types/Ruuvi';

const deviceDataSchema = new Schema({
  data: {
    humidity: {type: Number, required: true},
    temperature: {type: Number, required: true},
    pressure: {type: Number, required: true},
    mac: {type: String, required: true},
    device: {name: String, type: String, ref: 'Device', required: true},
  },
  timestamp: {type: Date, default: Date.now},
});
export default model<Ruuvi>('deviceDataDetails', deviceDataSchema);
