import express from 'express'
import courseCtrl from '../controllers/courseCtrl'
import auth from '../middleware/auth'

const router = express.Router()
/**
 * @openapi
 * '/api/course':
 *  post:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - Course
 *     summary: Create course
 *     requestBody:
 *     responses:
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */
router.post('/course', auth, courseCtrl.createCourse)
/**
 * @openapi
 * '/api/courses':
 *  get:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - Course
 *     summary: Get courses
 *     requestBody:
 *     responses:
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */
router.get('/courses', courseCtrl.getCourses)
/**
 * @openapi
 * '/api/course/{id}':
 *  get:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - Course
 *     summary: Get detail courses
 *     requestBody:
 *     responses:
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */
router.get('/course/:id', courseCtrl.getDetailCourses)
/**
 * @openapi
 * '/api/course/{id}':
 *  patch:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - Course
 *     summary: Update course
 *     requestBody:
 *     responses:
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */
router.patch('/course/:id', auth, courseCtrl.updateCourse)

router.delete('/course/:id', auth, courseCtrl.deleteCourse)

export default router;
