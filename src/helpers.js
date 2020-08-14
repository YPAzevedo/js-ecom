module.exports = {
  getError: (errors, name) => {
    try {
      return errors.mapped()[name].msg;
    } catch (error) {
      return "";
    }
  }
}