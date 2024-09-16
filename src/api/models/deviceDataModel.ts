import { model, Schema } from 'mongoose';
import {DeviceData} from '../../types/DeviceData';

const deviceDataSchema = new Schema<DeviceData>(
  {
    deviceId: {type: Number, required: true},
    timestamp: {type: Date, required: true},
    data: {type: Schema.Types.Mixed, required: true},
  },
  {collection: 'deviceData'}
);

export default model<DeviceData>('DeviceData', deviceDataSchema);
