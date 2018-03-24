const contactController = require('../controllers/Contact')


module.exports = {
  configureRoutes(router) {
    router
      .get('/contacts', contactController.contacts)
      .get('/contacts/:id', contactController.contact)
      .put('/contacts/:id', contactController.update)
      .delete('/contacts/:id', contactController.delete)
      .post('/contacts', contactController.create)
  }
}
