const layout = require('../../layout');
const { getError } = require('../../../helpers');

module.exports = (errors) => {
  return layout(`
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-one-quarter">
            <form method="POST" enctype="multipart/form-data">
              <h1 class="title">Add Products</h1>
              <div class="field">
                <label class="label">Title</label>
                <input required class="input" placeholder="Product name" name="title" />
                <p class="help is-danger">${getError(errors, 'title')}</p>
              </div>
              <div class="field">
                <label class="label">Price</label>
                <input required class="input" placeholder="Price" name="price" type="number" />
                <p class="help is-danger">${getError(errors, 'price')}</p>
              </div>
              <div class="field">
                <label class="label">Image</label>
                <input required class="input" placeholder="Product image" name="image" type="file" />
                <p class="help is-danger">${getError(errors, 'image')}</p>
              </div>
              <button class="button is-primary">Add</button>
            </form>
          </div>
        </div>
      </div>
    `);
};