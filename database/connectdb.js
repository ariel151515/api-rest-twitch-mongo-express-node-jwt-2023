import mongoose from "mongoose";

try {
    mongoose.connect(process.env.MONGODB_URI, () => {
        console.log("Connect DB ok 👋");
    });
} catch (error) {
    console.log("Error de conexión a mongodb:" + error);
}


//Hola como estas 