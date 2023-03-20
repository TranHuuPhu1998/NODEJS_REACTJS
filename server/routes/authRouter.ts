import express from 'express'
import authCtrl from '../controllers/authCtrl'
import { validRegister } from '../middleware/vaild'

const router = express.Router()
/**
 *  @openapi
 *  '/api/auth/register':
 *  post:
 *    tags:
 *    - Auth
 *    summary: Register
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              name:
 *                type: string
 *                default: phu
 *              account:
 *                type: string
 *                default: tranhuuphu877@gmail.com
 *              password:
 *                type: string
 *                default: 123qwe
 *    responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Conflict
 */
router.post('/register', validRegister, authCtrl.register)

/**
 *  @openapi
 *  '/api/auth/active':
 *  post:
 *    tags:
 *    - Auth
 *    summary: Active account
 */
router.post('/active', authCtrl.activeAccount)

/**
 *  @openapi
 *  '/api/auth/login':
 *  post:
 *    tags:
 *    - Auth
 *    summary: Login
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            properties:
 *              account:
 *                type: string
 *                default: tranhuuphu877@gmail.com
 *              password:
 *                type: string
 *                default: 123qwe
 *    responses:
 *     200:
 *       description: Success
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               access_token:
 *                 type: string
 *               msg:
 *                 type: string
 *               user:
 *                 type: object
 *     400:
 *        description: Conflict
 */
router.post('/login', authCtrl.login)

/**
 *  @openapi
 *  '/api/auth/logout':
 *  get:
 *    tags:
 *    - Auth
 *    summary: Logout
 */
router.get('/logout', authCtrl.logout)

/**
 *  @openapi
 *  '/api/auth/refresh_token':
 *  get:
 *    tags:
 *    - Auth
 *    summary: Refresh token
 */
router.get('/refresh_token', authCtrl.refreshToken)

/**
 *  @openapi
 *  '/api/auth/google_login':
 *  post:
 *    tags:
 *    - Auth
 *    summary: Google login
 */
router.post('/google_login', authCtrl.googleLogin)

/**
 *  @openapi
 *  '/api/auth/facebook_login':
 *  post:
 *    tags:
 *    - Auth
 *    summary: Facebook login
 */
router.post('/facebook_login', authCtrl.facebookLogin)

export default router;
