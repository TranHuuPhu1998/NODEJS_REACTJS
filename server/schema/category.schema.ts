/**
 * @openapi
 * components:
 *   schemas:
 *     CategoryResponse:
 *       type: object
 *       required:
 *       - name
 *       properties:
 *         rows:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              default: JS
 *            user:
 *              type: string
 *              default: "622d5c19b9c2211e10500657"
 *            createdAt:
 *              type: string
 *              default: "2023-02-26T08:13:46.623Z"
 *            updatedAt:
 *              type: string
 *              default: "2023-02-26T08:13:46.623Z"
 *            _id:
 *              type: string
 *              default: "63fb14badd58b87d85056059"
 *     CreateCategoryInput:
 *       type: object
 *       required:
 *       - name
 *       properties:
 *        name:
 *          type: string
 *          default: JS
 *     ListCategory:
 *      type: object
 *      required:
 *      - name
 *      properties:
 *        rows:
 *          type: object
 *          properties:
 *            docs:
 *              type: object
 *            hasNextPage:
 *              type: boolean
 *            hasPrevPage:
 *              type: boolean
 *            limit:
 *              type: number
 *            nextPage:
 *              type: number
 *            page:
 *              type: number
 *            pagingCounter:
 *              type: number
 *            prevPage:
 *              type: integer
 *              nullable: true
 */
