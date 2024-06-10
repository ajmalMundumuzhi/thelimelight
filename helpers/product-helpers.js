const Article = require('../db/schema/Article');

function addProduct(req, callback) {
  let product = req.body;

  if (req.files.image) {
    let image = req.files.image;
    let base_path = 'storage/products/' + image.name;
    let image_path = __dirname + '/../public/' + base_path;
    image.mv(image_path, function (err) {
      if (err) callback(new Error(err), null);
    });

    Object.assign(product, { image: base_path });
  }
  //   Article.create(product)
  const article = new Article(product);
  article
    .save()
    .then((data) => {
      callback(null, data);
    })
    .catch((error) => {
      console.error('Error adding product:', error);
      callback(error, null);
    });
}
function getAllProducts() {
  return new Promise((resolve, reject) => {
    let products = Article.find().lean();
    resolve(products);
  });
}
function deleteProduct(prodId) {
  return new Promise((resolve, reject) => {
    Article.findByIdAndDelete(prodId)
      .then((response) => {
        console.log(response);
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
function getProductDetails(prodId) {
  return new Promise((resolve, reject) => {
    Article.findById(prodId).then((product) => {
      resolve(product);
    });
  });
}
function updateProduct(prodId, proDetails) {
  return new Promise((resolve, reject) => {
    Article.findByIdAndUpdate(prodId, {
      Name: proDetails.Name,
      Category: proDetails.Category,
      Price: proDetails.Price,
      Description: proDetails.Description,
    }).then((response) => {
      resolve();
    });
  });
}

module.exports = {
  addProduct,
  getAllProducts,
  deleteProduct,
  getProductDetails,
  updateProduct,
};
