import { Router, Request, Response, NextFunction } from "express";
import { Product, products } from "../models/product";
import {
  NotFoundError,
  ForbiddenError,
  ValidationError,
  BadRequestError,
  HttpError,
} from "../utils/customErrors";

const router = Router();

// Helper function to check if a product is one of the default 5
const isDefaultProduct = (id: number): boolean => id <= 5;

// Validation middleware
const validateProduct = (req: Request, _res: Response, next: NextFunction) => {
  const errors: string[] = [];
  const { name, category, subCategory, price, stock, brand, description } =
    req.body;

  if (!name || typeof name !== "string")
    errors.push("Name is required and must be a string");
  if (!category || typeof category !== "string")
    errors.push("Category is required and must be a string");
  if (!subCategory || typeof subCategory !== "string")
    errors.push("SubCategory is required and must be a string");
  if (!price || typeof price !== "number" || price <= 0)
    errors.push("Price is required and must be a positive number");
  if (
    !stock ||
    typeof stock !== "number" ||
    !Number.isInteger(stock) ||
    stock < 0
  )
    errors.push("Stock is required and must be a non-negative integer");
  if (!brand || typeof brand !== "string")
    errors.push("Brand is required and must be a string");
  if (!description || typeof description !== "string")
    errors.push("Description is required and must be a string");

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  next();
};

const validateNotRequiredProduct = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const errors: string[] = [];
  const { name, category, subCategory, price, stock, brand, description } =
    req.body;

  if (name && typeof name !== "string") errors.push("Name must be a string");
  if (category && typeof category !== "string")
    errors.push("Category must be a string");
  if (subCategory && typeof subCategory !== "string")
    errors.push("SubCategory must be a string");
  if (price && (typeof price !== "number" || price <= 0))
    errors.push("Price must be a positive number");
  if (
    stock &&
    (typeof stock !== "number" || !Number.isInteger(stock) || stock < 0)
  )
    errors.push("Stock must be a non-negative integer");
  if (brand && typeof brand !== "string") errors.push("Brand must be a string");
  if (description && typeof description !== "string")
    errors.push("Description must be a string");

  if (errors.length > 0) {
    throw new ValidationError(errors);
  }

  next();
};

// Error handling middleware
const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      error: err.message,
      ...(err instanceof ValidationError && { errors: err.errors }),
    });
  } else {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrieve a list of products with optional filtering, pagination, and sorting.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: subCategory
 *         schema:
 *           type: string
 *         description: Filter by subcategory
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price filter
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price filter
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term for product name, description, or brand
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order (ascending or descending)
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalProducts:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      page = "1",
      limit = "10",
      category,
      subCategory,
      minPrice,
      maxPrice,
      search,
      sort = "id",
      order = "asc",
    } = req.query;

    let filteredProducts = [...products];

    if (category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category.toLowerCase() === (category as string).toLowerCase()
      );
    }

    if (subCategory) {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.subCategory.toLowerCase() === (subCategory as string).toLowerCase()
      );
    }

    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price >= parseFloat(minPrice as string)
      );
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price <= parseFloat(maxPrice as string)
      );
    }

    if (search) {
      const searchLower = (search as string).toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.brand.toLowerCase().includes(searchLower)
      );
    }

    // Sorting
    filteredProducts.sort((a, b) => {
      if (a[sort as keyof Product] < b[sort as keyof Product])
        return order === "asc" ? -1 : 1;
      if (a[sort as keyof Product] > b[sort as keyof Product])
        return order === "asc" ? 1 : -1;
      return 0;
    });

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = pageNum * limitNum;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    res.json({
      totalProducts: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / limitNum),
      currentPage: pageNum,
      products: paginatedProducts,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
router.get("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) throw new NotFoundError("Product not found");
    res.json(product);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProductPayload'
 *     responses:
 *       201:
 *         description: The created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Maximum product limit reached
 */
router.post(
  "/",
  validateProduct,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      if (products.length >= 50) {
        throw new BadRequestError("Maximum product limit reached");
      }

      const newProduct: Product = {
        id: products.length + 1,
        ...req.body,
        rating: 0,
        reviews: 0,
      };

      products.push(newProduct);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /api/products/{id}:
 *   patch:
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProductPayload'
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       403:
 *         description: Cannot update default products
 *       404:
 *         description: Product not found
 */
router.patch(
  "/:id",
  validateNotRequiredProduct,
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      if (isDefaultProduct(id)) {
        throw new ForbiddenError("Cannot update default products");
      }

      const index = products.findIndex((p) => p.id === id);
      if (index === -1) throw new NotFoundError("Product not found");

      products[index] = { ...products[index], ...req.body, id };
      res.json(products[index]);
    } catch (error) {
      next(error);
    }
  }
);
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product id
 *     responses:
 *       204:
 *         description: Product deleted
 *       403:
 *         description: Cannot delete default products
 *       404:
 *         description: Product not found
 */
router.delete("/:id", (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id);
    if (isDefaultProduct(id)) {
      throw new ForbiddenError("Cannot delete default products");
    }

    const index = products.findIndex((p) => p.id === id);
    if (index === -1) throw new NotFoundError("Product not found");

    products.splice(index, 1);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

router.use(errorHandler);

export default router;
