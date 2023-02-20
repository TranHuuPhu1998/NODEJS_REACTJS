import express from 'express'
import questionCtrl from '../controllers/questionsCtrl'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/question',auth, questionCtrl.createQuestion)
router.get('/questions',auth,questionCtrl.getQuestion)
router.get('/question/:id' , questionCtrl.getDetailQuestion)
router.patch('/question/:id' ,auth,questionCtrl.updateQuestion)
router.delete('/question/:id' ,auth,questionCtrl.deleteQuestion)
router.get('/question/category/:id',questionCtrl.getQuestionsByCategory)
router.get('/question/courses/:id',questionCtrl.getQuestionByCourse)
export default router;