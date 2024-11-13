import { Router, Request, Response, NextFunction } from "express";
import { products } from "../models/product";
import { HttpError, ValidationError } from "../utils/customErrors";

const router = Router();

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
 * /api/categories:
 *   get:
 *     summary: Get all product categories and subcategories
 *     responses:
 *       200:
 *         description: A list of categories and subcategories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: array
 *                 items:
 *                   type: string
 */
router.get("/", (req, res, next) => {
  try {
    const categories: Record<string, Set<string>> = {};
    products.forEach((p) => {
      if (!categories[p.category]) {
        categories[p.category] = new Set();
      }
      categories[p.category].add(p.subCategory);
    });

    const result: Record<string, string[]> = {};
    for (const [category, subcategories] of Object.entries(categories)) {
      result[category] = Array.from(subcategories);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.use(errorHandler);

export default router;
