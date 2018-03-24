const messageController = require('../controllers/Message')

module.exports = {
  configureRoutes(router) {
    router
      .get('/messages', messageController.messages)
      .get('/messages/:id', messageController.message)
      .put('/messages/:id', messageController.update)
      .delete('/messages/:id', messageController.delete)
      .post('/messages', messageController.create)
  }
}
