import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { isAdmin, isAuthenticated } from '../utils.js';

const productRoute = express.Router();

productRoute.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// productRoute.post(
//   '/',
//   isAuthenticated,
//   isAdmin,
//   expressAsyncHandler(async (req, res) => {
//     const newProduct = new Product({
//       name: 'sample name ' + Date.now(),
//       slug: 'sample-name-' + Date.now(),
//       image: '/images/airforce1midreact.png',
//       price: 50,
//       category: 'sample category',
//       size: 29,
//       brand: 'sample brand',
//       countInStock: 10,
//       rating: 0,
//       numReviews: 3,
//       description: 'sample description',
//     });
//     const product = await newProduct.save();
//     res.send({ message: 'Product Created', product });
//   })
// );

productRoute.post(
  '/addproduct',
  isAuthenticated,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      name: req.body.name,
      slug: req.body.slug,
      image: req.body.image,
      images: req.body.images,
      defaultImage: req.body.defaultImage,
      price: req.body.price,
      category: req.body.category,
      size: req.body.size,
      brand: req.body.brand,
      countInStock: req.body.countInStock,
      rating: 0,
      numReviews: 0,
      description: req.body.description,
    });
    const product = await newProduct.save();
    res.send({
      _id: product._id,
      name: product.name,
      slug: product.slug,
      image: product.image,
      images: product.images,
      defaultImage: product.defaultImage,
      price: product.price,
      category: product.category,
      size: product.size,
      brand: product.brand,
      countInStock: product.countInStock,
      rating: product.rating,
      numReviews: product.numReviews,
      description: product.description,
     });
  })
);

productRoute.put(
  '/:id',
  isAuthenticated,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.images = req.body.images;
      product.defaultImage = req.body.defaultImage;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.size = req.body.size;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      await product.save();
      res.send({ message: 'Product Updated' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRoute.delete(
  '/:id',
  isAuthenticated,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: 'Product Deleted' });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

const PAGE_SIZE = 3;

productRoute.get(
  '/admin',
  isAuthenticated,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

productRoute.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);


productRoute.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});
productRoute.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

export default productRoute;
