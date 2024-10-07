import {model, Schema} from 'mongoose';
import {DeviceClass} from '../../types/DeviceClassTypes';

const deviceClassSchema = new Schema({
  name: {type: String, required: true, unique: true},
  type: {type: Array, required: true},
});

export default model<DeviceClass>('DeviceClass', deviceClassSchema);
