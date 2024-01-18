const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsController {
  async create(req, res) {
    try {
      const { email, password } = req.body;

      const user = await knex("users").where({ email }).first();

      if (!user) {
        throw new AppError("E-mail e/ou senha incorreta", 401);
      }

      const passwordMatch = await compare(password, user.password);

      if (!passwordMatch) {
        throw new AppError("E-mail e/ou senha incorreta", 401);
      }

      const { secret, expiresIn } = authConfig.jwt;
      const token = sign({}, secret, { subject: String(user.id), expiresIn });

      return res.json({ user, token });
    } catch (error) {
      return res
        .status(error.statusCode || 401)
        .json({ status: "error", message: error.message });
    }
  }
}

module.exports = SessionsController;
