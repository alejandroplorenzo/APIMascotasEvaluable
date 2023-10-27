import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import postMascotas from "./resolvers/postMascotas.ts";
import getMascotas from "./resolvers/getMascotas.ts";
import deleteMascotas from "./resolvers/deleteMascotas.ts";
import putMascotas from "./resolvers/putMascotas.ts";
import getMascotasId from "./resolvers/getMascotasId.ts";

const MONGO_URL = "mongodb+srv://apl:190700@cluster0.dwvtvaq.mongodb.net/?retryWrites=true&w=majority";

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());

app
  .post("/postMascotas", postMascotas)
  .get("/getMascotas", getMascotas)
  .delete("/deleteMascotas/:id", deleteMascotas)
  .get("/getMascotasId/:id", getMascotasId)
  .put("/putMascotas", putMascotas);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});