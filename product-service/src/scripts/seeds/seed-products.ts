import { AppDataSource } from "../../data-source";
import { Product } from "../../entity/product.entity";
import { ProductRepository } from "../../repository/product.repository";

async function seedProductsDatabase() {
  await AppDataSource.initialize();
  console.log("Database connected");

  const productRepository = new ProductRepository(
    AppDataSource.getRepository(Product)
  );

  const seedDataProducts = [
    {
      name: "Nevera",
      description: "Una nevera de dos puertas nueva",
      price: 1800000,
      stock: 4,
    },
    {
      name: "Lavadora",
      description: "Una lavadora usada",
      price: 800000,
      stock: 1,
    },
    {
      name: "Horno microhondas",
      description: "Un horno microhondas nuevo muy potente",
      price: 400000,
      stock: 8,
    },
  ];

  // Insertar los usuarios
  for (const product of seedDataProducts) {
    const exists = await productRepository.findOneBy({ name: product.name });
    if (!exists) {
      await productRepository.save(product);
      console.log(`Producto creado: ${product.name}`);
    } else {
      console.log(`Producto ya existe: ${product.name}`);
    }
  }

  await AppDataSource.destroy();
  console.log("Database disconnected");
}

seedProductsDatabase().catch((err) => {
  console.error("Error en seed users:", err);
  process.exit(1);
});
