import Database from "@ioc:Adonis/Lucid/Database";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Produt";

export default class ProdutsController {
  public ProdutsController() {}

  //store Produsts
  public async store({ request }: HttpContextContract) {
    const body = request.body();

    const produts = await Database.query()
      .from("produts")
      .where("product_code", body.product_code)
      .select("*");
    if (produts.length > 0) {
      return {
        massage:
          "Já existe um produto com esta referência ou o id do utilizador não existe.",
        data: produts,
      };
    }

    const product = await Product.create(body);
    return {
      massage: "Produto criado com sucesso",
      data: product,
    };
  }

  //show all User
  public async show() {
    const produts = await Product.all();
    const count = produts.length;
    return {
      massage: "Lista de Produtos Registados",
      qtdUser: count,
      data: produts,
    };
  }

  //select Product by id of User
  public async showProductsByUser({ params }: HttpContextContract) {
    const { id: userId } = params;

    try {
      const porduts = await Database.query()
        .from("produts")
        .where("produts.user_id", userId)
        .select("*");
      if (porduts.length > 0) {
        return {
          massage: "Produtos",
          data: porduts,
        };
      } else {
        return 401;
      }
    } catch (error) {
      return 401;
    }
  }

  //update product
  public async updateProduct({ params, request }: HttpContextContract) {
    const body = request.body();
    try {
      const porduts = await Product.findOrFail(params.id);

      porduts.name = body.name;
      porduts.description = body.description;
      porduts.type = body.type;
      porduts.unit_price = body.unit_price;
      porduts.bought_price = body.bought_price;
      porduts.quantity_in_stock = body.quantity_in_stock;
      porduts.user_id = body.user_id;
      porduts.save();

      return 200;
    } catch (error) {
      return 401;
    }
  }

  //delete Product by id
  public async delete({ params }: HttpContextContract) {
    try {
      const porduts = await Product.findOrFail(params.id);
      porduts.delete();

      return 200;
    } catch (error) {
      return 401;
    }
  }
}
