import {model, Schema} from 'mongoose';
import {Ruuvi} from '../../types/Ruuvi';

const ruuviSchema = new Schema({
  data: {
    data_format: {type: Number, required: true},
    humidity: {type: Number, required: true},
    temperature: {type: Number, required: true},
    pressure: {type: Number, required: true},
    acceleration: {type: Number, required: true},
    acceleration_x: {type: Number, required: true},
    acceleration_y: {type: Number, required: true},
    acceleration_z: {type: Number, required: true},
    tx_power: {type: Number, required: true},
    battery: {type: Number, required: true},
    movement_counter: {type: Number, required: true},
    measurement_sequence_number: {type: Number, required: true},
    mac: {type: String, required: true},
    rssi: {type: Number, required: false},
  },
  timestamp: {type: Date, default: Date.now},
});
export default model<Ruuvi>('Ruuvi', ruuviSchema);
