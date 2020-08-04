const fs = require("fs");
const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);

module.exports = class Repository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Create a new repository requires a filename");
    }

    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (error) {
      fs.writeFileSync(this.filename, "[]");
    }
  }

  async getAll() {
    const contents = await fs.promises.readFile(this.filename, {
      encoding: "utf-8",
    });
    const data = JSON.parse(contents);
    return data;
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

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async getOneBy(key, value) {
    const records = await this.getAll();
    const record = records.find((r) => r[key] === value);

    return record;
  }

  async delete(id) {
    const records = await this.getAll();
    const newRecords = records.filter((record) => record.id !== id);
    await this.writeAll(newRecords);
  }

  async update(id, attributes) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    if (!record) {
      throw new Error("No record found with this id.");
    }

    Object.assign(record, attributes);

    await this.writeAll(records);
  }

  randomId() {
    return crypto.randomBytes(8).toString("hex");
  }
};
