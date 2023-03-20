import express from 'express'
import questionCtrl from '../controllers/questionsCtrl'
import auth from '../middleware/auth'

const router = express.Router()
/**
 * @openapi
 * '/api/question':
 *  post:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - Question
 *     summary: Create course
 */
router.post('/question', auth, questionCtrl.createQuestion)
/**
 * @openapi
 * '/api/question':
 *  get:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - Question
 *     summary: Create course
 */
router.get('/questions', auth, questionCtrl.getQuestion)
/**
 * @openapi
 * '/api/question/{questionId}':
 *  get:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - Question
 *     summary: Get question
 */
router.get('/question/:id', questionCtrl.getDetailQuestion)
/**
 * @openapi
 * '/api/question/{questionId}':
 *  patch:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - Question
 *     summary: Update question
 */
router.patch('/question/:id', auth, questionCtrl.updateQuestion)
/**
 * @openapi
 * '/api/question/{questionId}':
 *  delete:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - Question
 *     summary: Delete question
 */
router.delete('/question/:id', auth, questionCtrl.deleteQuestion)
/**
 * @openapi
 * '/api/question/category/{categoryId}':
 *  delete:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - Question
 *     summary: Get questions by category
 */
router.get('/question/category/:id', questionCtrl.getQuestionsByCategory)
/**
 * @openapi
 * '/api/question/courses/{categoryId}':
 *  delete:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - Question
 *     summary: Get question by course
 */
router.get('/question/courses/:id', questionCtrl.getQuestionByCourse)

export default router;
