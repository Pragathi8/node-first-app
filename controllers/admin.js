const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
    })
    .then(result => {
      console.log("Created Product");
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!(editMode === "true")) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  req.user
    .getProducts({ where: { id: prodId } })
    .then(products => {
      const product = products[0];
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        product: product,
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProducts = (req, res, next) => {
  const { productId, title, imageUrl, description, price } = req.body;
  Product.findById(productId)
    .then(product => {
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;
      return product.save();
    })
    .then(result => {
      console.log("UPDATED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then(products => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products"
      });
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log("DESTROYED PRODUCT");
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};
