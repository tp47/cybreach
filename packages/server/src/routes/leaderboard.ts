import express from 'express'
import { leaderboardController } from '@/controllers'

const router = express.Router()

router.get('/', leaderboardController.getAll)

export default router
