import express from 'express'
import userCtrl from '../controllers/userCtrl'
import auth from '../middleware/auth'

const router = express.Router()
/**
 * @openapi
 * '/api/user':
 *  patch:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - User
 *     summary: Update user
 */
router.patch('/user', auth, userCtrl.updateUser)
/**
 * @openapi
 * '/api/reset_password':
 *  patch:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - User
 *     summary: Reset password
 */
router.patch('/reset_password', auth, userCtrl.resetPassword)
/**
 * @openapi
 * '/api/user':
 *  get:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - User
 *     summary: Get user
 */
router.get('/user', auth, userCtrl.getUser);
/**
 * @openapi
 * '/api/users':
 *  get:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - User
 *     summary: Get List user
 */
router.get('/users', userCtrl.getListUser);
/**
 * @openapi
 * '/api/users/avatar':
 *  patch:
 *     security:
 *        - ApiKeyAuth: []
 *     tags:
 *     - User
 *     summary: Update user avatar
 */
router.patch('/user/avatar', auth, userCtrl.updateUserAvatar)

export default router;
