import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const getMascotas = async (_req: Request, res: Response) => {
    try{
        const mascota = await MascotaModel.find().exec();
        if (!mascota) {
            res.status(404).send("Mascota not found");
            return;
        }
        res.status(200).send(mascota);
    }catch(error){
        res.status(404).send(error.message);
        return;
    }
}

export default getMascotas;