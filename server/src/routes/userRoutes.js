import express from 'express'

import {handleUserRegister,
        handleUserLogin } from "../controllers/uerControllers.js"

const router = express.Router()

router.post('/register', handleUserRegister)
router.get('/login', handleUserLogin)
export default router