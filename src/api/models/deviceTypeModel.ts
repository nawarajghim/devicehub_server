import {model, Schema} from 'mongoose';
import {DeviceType} from '../../types/DeviceTypeTypes';

const deviceTypeSchema = new Schema({
  name: {type: String, required: true},
  type: {type: Array, required: true},
});

export default model<DeviceType>('DeviceType', deviceTypeSchema);
