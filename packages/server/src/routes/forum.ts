import express from 'express'
import { forumController } from '@/controllers'

const router = express.Router()

router.post('/author', forumController.createOrUpdateAuthor)
router.get('/topics', forumController.getAllTopics)
router.get('/topic/:id', forumController.getTopic)
router.post('/topic', forumController.createTopic)
router.delete('/topic/:id', forumController.deleteTopic)
router.put('/topic/:id', forumController.editTopic)
router.post('/comments', forumController.createComment)
router.get('/comments', forumController.getAllComments)
router.delete('/comments/:id', forumController.deleteComment)
router.put('/comments/:id', forumController.editComment)
router.post('/views', forumController.updateViewsCount)
router.get('/reactions', forumController.getAllReactions)
router.post('/reactions', forumController.createReaction)
router.delete('/reactions/:id', forumController.deleteReaction)
router.put('/reactions/:id', forumController.editReaction)

export default router
