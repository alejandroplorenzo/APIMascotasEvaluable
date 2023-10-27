import mongoose from "npm:mongoose@7.6.3";
import { mascota } from "../types.ts";

const Schema = mongoose.Schema;

const mascotaSchema = new Schema(
    {
      nombre: { type: String, required: true},
      descripcion: { type: String, required: true},
      tipo: { type: String, required: true },
    },
    { timestamps: true }
  );
  
  export type mascotaModelType = mongoose.Document & Omit<mascota, "id">;
  
  export default mongoose.model<mascotaModelType>("Mascotas", mascotaSchema);