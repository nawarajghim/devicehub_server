import {model, Schema} from 'mongoose';
import {Admin} from '../../types/Admin';

const adminSchema = new Schema(
  {
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
  },
  {collection: 'users'}
);

export default model<Admin>('Admin', adminSchema);
