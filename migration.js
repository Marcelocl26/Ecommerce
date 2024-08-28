import mongoose from 'mongoose';
import { Product } from './models'; // Asegúrate de importar tu modelo correctamente

// Conecta a tu base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/tu_basededatos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updateProducts() {
  try {
    // Actualiza todos los productos añadiendo los nuevos campos con valores predeterminados
    await Product.updateMany({}, {
      $set: {
        featured: false, // Valor predeterminado para el campo featured
        rating: 0, // Valor predeterminado para el campo rating
        sales: 0, // Valor predeterminado para el campo sales
      }
    });
    console.log('Productos actualizados exitosamente.');
  } catch (error) {
    console.error('Error al actualizar productos:', error);
  } finally {
    mongoose.connection.close();
  }
}

updateProducts();
