import express from 'express'
import courseCtrl from '../controllers/courseCtrl'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/course',auth, courseCtrl.createCourse)
router.get('/courses', courseCtrl.getCourses)
router.get('/course/:id', courseCtrl.getDetailCourses)
router.patch('/course/:id', auth, courseCtrl.updateCourse)
router.delete('/course/:id', auth, courseCtrl.deleteCourse)

export default router;