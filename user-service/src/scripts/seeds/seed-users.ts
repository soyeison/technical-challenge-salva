import axios from "axios";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/user.entity";
import { UserRepository } from "../../repository/user.repository";

const APP_ORDER_SERVICE = "http://order-service:3006";

async function seedUsersDatabase() {
  await AppDataSource.initialize();
  console.log("Database connected");

  const userRepository = new UserRepository(AppDataSource.getRepository(User));

  const seedDataUsers = [
    {
      firstName: "Jhon",
      lastName: "Doe",
      email: "jhondoe@example.com",
      password: "$2a$10$YNluHPBlw6KqXVbSS0MkVO4CpthbM7ANn0PaJDIVvmmS1F4WwK2sK", //qwerty
    },
    {
      firstName: "Pepito",
      lastName: "Perez",
      email: "pepitoperez@example.com",
      password: "$2a$10$YNluHPBlw6KqXVbSS0MkVO4CpthbM7ANn0PaJDIVvmmS1F4WwK2sK",
    },
    {
      firstName: "Juanito",
      lastName: "Gonzales",
      email: "juanitogonzales@example.com",
      password: "$2a$10$YNluHPBlw6KqXVbSS0MkVO4CpthbM7ANn0PaJDIVvmmS1F4WwK2sK",
    },
  ];

  // Insertar los usuarios
  for (const user of seedDataUsers) {
    const exists = await userRepository.findOneBy({ email: user.email });
    if (!exists) {
      const userCreated = await userRepository.save(user);
      console.log(`Usuario creado: ${user.firstName}`);

      // Crearlos en la base de datos de ordenes
      await axios.post(
        `${APP_ORDER_SERVICE}/users`,
        {
          fullName: `${userCreated.firstName} ${userCreated.lastName}`,
          userServiceId: userCreated.id,
        },
        {
          validateStatus: (status: number) => status < 500,
        }
      );
    } else {
      console.log(`Usuario ya existe: ${user.firstName}`);
    }
  }

  await AppDataSource.destroy();
  console.log("Database disconnected");
}

seedUsersDatabase().catch((err) => {
  console.error("Error en seed users:", err);
  process.exit(1);
});
