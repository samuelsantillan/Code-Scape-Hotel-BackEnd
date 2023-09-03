import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/newsletter", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("Error al conectar a la base de datos");
    console.log(error);
  }
};
export default connectDb;