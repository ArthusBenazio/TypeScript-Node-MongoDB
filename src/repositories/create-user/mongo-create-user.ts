import { MongoClient } from "./../../database/mongo";
import { IUser } from "../../models/user";
import {
  CreateUserParams,
  ICreateUserRepository,
} from "./../../controllers/create-user/protocols";
import { MongoUser } from "../mongo-protocols";

export class MongoCreateUserRepository implements ICreateUserRepository {
  async createUser(params: CreateUserParams): Promise<IUser> {
    const { insertedId } = await MongoClient.db
      .collection("users")
      .insertOne(params);

    const user = await MongoClient.db
      .collection<MongoUser>("users")
      .findOne({ _id: insertedId });

    if (!user) {
      throw new Error("User not created");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
