import express from 'express'

import {handleUserRegister,
        handleUserLogin } from "../controllers/uerControllers.js"

const router = express.Router()

router.post('/register', handleUserRegister)
router.post('/login', handleUserLogin)


export const verifyToken = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
          jwt.verify(authHeader, "secret", (err) => {
            if (err) {
              return res.sendStatus(403);
            }
            next();
          });
        } else {
          res.sendStatus(401);
        }
      };
export default router