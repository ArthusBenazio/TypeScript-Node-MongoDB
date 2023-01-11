import validator from "validator";
import { HttpRequest, IController, HttpResponse } from "./../protocols";
import { IUser } from "../../models/user";
import { CreateUserParams, ICreateUserRepository } from "./protocols";
import { badRequest, created, serverError } from "../helpers";

export class CreateUserController implements IController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>
  ): Promise<HttpResponse<IUser | string>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("Email is invalid");
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!
      );

      return created<IUser>(user);
    } catch (error) {
      return serverError();
    }
  }
}
