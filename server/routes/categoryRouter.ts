import express from "express";
import categoryCtrl from "../controllers/categoryCtrl";
import auth from "../middleware/auth";

const router = express.Router();
/**
 * @openapi
 * '/api/category':
 *  post:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - Category
 *     summary: Create category
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateCategoryInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CategoryResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */
router.post("/category", auth, categoryCtrl.createCategory);
/**
 *  @openapi
 *  '/api/categories':
 *  get:
 *    tags:
 *    - Category
 *    summary: Get all category
 *    responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ListCategory'
 *      409:
 *        description: Conflict
 */
router.get("/categories", categoryCtrl.getCategories);
/**
 *  @openapi
 *  '/api/category/{categoryId}':
 *    parameters:
 *    - name: categoryId
 *      in: path
 *      required: true
 *      schema:
 *        type: string
 *    patch:
 *      tags:
 *      - Category
 *      summary: Get one category by id
 */
router.patch("/category/:id", auth, categoryCtrl.updateCategory);
/**
 *  @openapi
 *  '/api/category/{categoryId}':
 *    parameters:
 *    - name: categoryId
 *      in: path
 *      required: true
 *      schema:
 *        type: string
 *    delete:
 *      security:
 *          - ApiKeyAuth: []
 *      tags:
 *      - Category
 *      summary: Delete one category by id
 *      responses:
 *        200:
 *          description: Success
 *        400:
 *          description: Bad request
 *        500:
 *          description: Server error
 */
router.delete("/category/:id", auth, categoryCtrl.deleteCategory);

export default router;
