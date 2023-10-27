import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const deleteMascotas = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mascota = await MascotaModel.findOneAndDelete( id ).exec();
    if (!mascota) {
      res.status(404).send("Mascota not found");
      return;
    }
    res.status(200).send("Mascota deleted");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteMascotas;