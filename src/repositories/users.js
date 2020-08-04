const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

const Repository = require("./blueprint/repository");

class UsersRepository extends Repository {
  constructor(filename) {
    super(filename);
  }

  async comparePassword(hashedPassword, password) {
    const [hash, salt] = hashedPassword.split(".");
    const hashSuppliedBuffer = await scrypt(password, salt, 64);

    return hash === hashSuppliedBuffer.toString("hex");
  }
}

module.exports = new UsersRepository("users.json");
