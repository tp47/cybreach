import express from 'express'
import { forumController } from '@/controllers'

const router = express.Router()

router.get('/topics', forumController.getAllTopics)
router.get('/topic/:id', forumController.getTopic)
router.post('/topic', forumController.createTopic)
router.post('/comments', forumController.createComment)
router.get('/comments', forumController.getAllComments)
router.post('/views', forumController.updateViews)

export default router
