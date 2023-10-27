import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const putMascotas = async (req: Request, res: Response) => {
  try{
    const {id} = req.params;
    const {nombre, descripcion, tipo } = req.body;
    //
    /*
    if(tipo !== "perro" || tipo !== "gato" || tipo !== "serpiente" || !nombre || !descripcion || !tipo){
      res.status(400).send("Parametros incorrectamente introducidos");
      return;
   }*/

    if(!nombre || !descripcion || !tipo){
        res.status(400).send("Parametros incorrectamente introducidos");
        return;
    }

    const updatedMascota = await MascotaModel.findOneAndUpdate(
        { id },
        { nombre, descripcion, tipo },
        { new: true }
    ).exec();

    if (!updatedMascota) {
        res.status(404).send("Mascota not found");
        return;
    }

    res.status(200).send({
        nombre: updatedMascota.nombre,
        descripcion: updatedMascota.descripcion,
        tipo: updatedMascota.tipo,
        id: updatedMascota._id.toString(),
      });

  }catch(error){
    res.status(500).send(error.message);
    return;
  }
};

export default putMascotas;