import { User } from "../entity/user.entity";

export type UserTypeWithoutPassword = Omit<User, "password">;
