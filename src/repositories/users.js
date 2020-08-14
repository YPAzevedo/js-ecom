const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

const Repository = require("./blueprint/repository");

class UsersRepository extends Repository {
  constructor(filename) {
    super(filename);
  }

  async create(record) {
    record.id = this.randomId();
    const records = await this.getAll();

    const salt = crypto.randomBytes(8).toString("hex");
    const hashed = await scrypt(record.password, salt, 64);

    const rec = record.password
      ? { ...record, password: `${hashed.toString("hex")}.${salt}` }
      : record;

    records.push(rec);

    try {
      await this.writeAll(records);
      return rec;
    } catch (error) {
      throw new Error("Failed to create user");
    }
  }

  async comparePassword(hashedPassword, password) {
    const [hash, salt] = hashedPassword.split(".");
    const hashSuppliedBuffer = await scrypt(password, salt, 64);

    return hash === hashSuppliedBuffer.toString("hex");
  }
}

module.exports = new UsersRepository("users.json");
