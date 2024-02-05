import express from 'express'
import { forumController } from '@/controllers'

const router = express.Router()

router.get('/topics', forumController.getAllTopics)
router.get('/topic/:id', forumController.getTopic)
router.post('/topic', forumController.createTopic)
router.post('/comments', forumController.createComment)
router.get('/comments', forumController.getAllComments)
router.post('/views', forumController.updateViews)
router.get('/reactions', forumController.getAllReactions);
router.post('/reactions', forumController.createReaction);

export default router
