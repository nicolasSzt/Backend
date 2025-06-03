import User from "../models/User_model.js";

class UserRepository {
  async create({ name, password, email, create_at }) {
    try {
      const user = new User({ name, password, email, create_at });
      await user.save();
      console.log("Usuario creado exitosamente!");
    } catch (error) {
      if (error.code === 11000) {
        throw {
          message: "Email repetido",
          status: 400,
        };
      } else {
        throw error;
      }
    }
  }

  async getAll() {
    const users = await User.find();
    return users;
  }

  async verifyUserEmail({ email }) {
    const user = await this.findByEmail({ email });

    if (user.verified) {
      throw { message: "usuario ya validado" };
    } else {
      const result = await User.findByIdAndUpdate(
        user.id,
        {
          $set: {
            verified: true,
          },
        },
        {
          runValidators: true,
          new: true,
        }
      );
      console.log({ result });
    }
  }

  async findByEmail({ email }) {
    return await User.findOne({ email: email });
  }
}

const userRepository = new UserRepository();

export default userRepository;
