import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../error/error-status";
import { User } from "../entity/user";
import { SignUpDto } from "../dto/sign-up.dto";

const APP_SERVICE_URL = "http://user-service:3002";
const saltRounds = 10;

export class AuthService {
  private secretKey: string = process.env.JWT_SECRET_KEY || "qwerty";
  async signIn(email: string, password: string) {
    try {
      const resp = await axios.get(
        `${APP_SERVICE_URL}/users/search?email=${email}`,
        {
          validateStatus: (status: number) => status < 500,
        }
      );

      if (resp.status === 404) {
        throw new AppError("User doen't exist", 404);
      }

      const user: User = resp.data.data;
      // Validar el password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new AppError("The password or email is incorrect", 401);
      }

      // Si el password es correcto generar jwt
      const token = jwt.sign({ userId: user.id }, this.secretKey, {
        expiresIn: "1h",
      });

      return {
        accesToken: token,
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      console.log("Error inesperado", error);
      throw new AppError("Error inesperado", 500);
    }
  }

  async signUp(payload: SignUpDto) {
    try {
      const resp = await axios.get(
        `${APP_SERVICE_URL}/users/search?email=${payload.email}`,
        {
          validateStatus: (status: number) => status < 500,
        }
      );

      if (resp.status === 200) {
        throw new AppError("User already exists", 400);
      }

      // hashear password
      const salt = await bcrypt.genSalt(saltRounds);
      const passwordHashed = await bcrypt.hash(payload.password, salt);

      // Actualizar la contrasena del usuario
      const respCreate = await axios.post(
        `${APP_SERVICE_URL}/users`,
        {
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: passwordHashed,
        },
        {
          validateStatus: (status: number) => status < 500,
        }
      );

      return respCreate.data.data;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      console.log("Error inesperado", error);
      throw new AppError("Error inesperado", 500);
    }
  }
}
