const fs = require("fs");
const { pathToFileURL } = require("url");
class ProductManager {
  products;
  id;
  constructor(path) {
    this.path = path;
    this.loadData();
  }

  loadData() {
    try {
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      this.id = this.products[-1].id;
    } catch (err) {
      fs.writeFileSync(this.path, JSON.stringify([]));
      this.products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      this.id = 0;
      // throw "Cannot be found"
    }
  }

  get getProducts() {
    // console.log(JSON.parse(fs.readFileSync(this.path, "utf-8")));
    return JSON.parse(fs.readFileSync(this.path, "utf-8"))
  }

  writeData(products) {
    this.products.push(products);
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }

  addProducts(title, description, price, thumbnail, uniCode, stock) {
    const elements = {
      id: this.id++,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: uniCode,
      stock: stock,
    };
    this.writeData(elements);

    if (this.products.find(({ code }) => code === uniCode)) {
      // console.log("The product you entered already exists");
    } else {
      this.writeData(elements);
    }
  }

  getProductById(test_id) {
    // console.log(this.products.find(({ id }) => id === test_id) || "Not found");
    return this.products.find(({ id }) => id === test_id) || "Not found"
  }

  updateProduct(test_id, title, description, price, thumbnail, stock) {
    const productsReplace = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    productsReplace.forEach((element) => {
      if (element.id === test_id) {
        element.title = title;
        element.description = description;
        element.price = price;
        element.thumbnail = thumbnail;
        element.stock = stock;
      }
    });
    fs.writeFileSync(this.path, JSON.stringify(productsReplace));
  }

  deleteProduct(test_id) {
    let ind;
    const productsDelete = JSON.parse(fs.readFileSync(this.path, "utf-8"));
    productsDelete.forEach((element, index) => {
      if (element.id === test_id) {
        ind = index;
      }
    });
    productsDelete.splice(ind, 1);

    for (ind; ind < productsDelete.length; ind++) {
      productsDelete[ind].id--;
      // console.log(productsDelete[ind].id);
    }

    fs.writeFileSync(this.path, JSON.stringify(productsDelete));
  }
}


module.exports = {
    ProductManager
}

