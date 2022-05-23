import { model, Schema, Model, Document } from 'mongoose';

export interface IConstellation extends Document {
  name: string;
  abbreviation: string;
  coordinataes: string;
}

const ConstellationSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  abbreviation: { type: String, required: true },
  coordinates: { type: String, required: true }
});

const Constellation: Model<IConstellation> = model('Constellation', ConstellationSchema);

export default Constellation;