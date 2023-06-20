import type { HttpContextContract,  } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Database from "@ioc:Adonis/Lucid/Database";


export default class UsersController {
  public UsersController() {}

  //show all User
  public async show() {
    const user = await User.all();
    const count = user.length;
    return {
      massage: "Lista de Utilizadores Registados",
      qtdUser: count,
      data: user,
    };
  }


  //login
  public async login ({ auth, request, response }:HttpContextContract) {
    const { email, password } = request.all()
    try {
      const token = await auth.use('api').attempt(email, password)
      return token
    } catch (err) {
      return response.unauthorized('Invalid credentials')
    }
  }

  public async logOut ({ auth }:HttpContextContract) {
   await auth.logout()
   return 201
  }

  //select User by id
  public async showUser({ params }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id);
      return {
        massage: "Utilizador",
        data: user,
      };
    } catch (error) {
      return "Utilizador não existe";
    }
  }

  //delete User by id
  public async delete({ params }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id);
      user.delete();
      return {
        massage: "Utilizador eliminado com sucesso!...",
        data: user,
      };
    } catch (error) {
      return "Utilizador não existe";
    }
  }

  //store User
  public async store({ request }: HttpContextContract) {
    const body = request.only(["username", "email", "password"]);
    console.log(body)

    const users = await Database.query()
      .from("users")
      .where("email", body.email)
      .select("*");
    if (users.length > 0) {
      return {
        massage: "Já existe um utilizador com este email.",
      };
    }

    const user = await User.create(body);
    return {
      massage: "Utilizador criado com sucesso",
      data: user,
    };
  }
}
