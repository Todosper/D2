import mongoose from "mongoose";
const url = "mongodb+srv://notebookdiscord_db_user:123@musica.srashye.mongodb.net/?appName=Musica";
const conexao = await mongoose.connect(url);

export default conexao;
