export class UserRepository {
  async getAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve([
        {
          id: 1,
          firstName: "Jhon",
          lastName: "Doe",
        },
        {
          id: 2,
          firstName: "Yeison",
          lastName: "Villegas",
        },
      ]);
    });
  }
}
