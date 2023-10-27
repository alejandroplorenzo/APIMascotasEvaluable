import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts"; 

const postMascotas = async (req: Request, res: Response) => {
    try{
        const {nombre, descripcion, tipo } = req.body;
        //No me hace bien la comparación del tipo con perro, gato, serpiente
        /*if(tipo !== "perro" || tipo !== "gato" || tipo !== "serpiente" || !nombre || !descripcion || !tipo){
            res.status(400).send("Parametros incorrectamente introducidos");
            return;
        }*/

        if(!nombre || !descripcion || !tipo){
            res.status(400).send("Parametros incorrectamente introducidos");
            return;
        }

        const alreadyExists = await MascotaModel.findOne({ nombre }).exec();
        if (alreadyExists) {
          res.status(400).send("Macota already exists");
          return;
        }

        const newMascota = new MascotaModel({ nombre, descripcion, tipo});
        await newMascota.save();

        res.status(200).send({
            nombre: newMascota.nombre,
            descripcion: newMascota.descripcion,
            tipo: newMascota.tipo,
            id: newMascota._id.toString(),
          });

    }catch(error){
        res.status(500).send(error.message);
        return;
    }
};

export default postMascotas;