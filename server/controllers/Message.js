const db = require('../models')
const log = require('../util/logger')
const responseHandler = require('../util/responseHandler')


module.exports = {
  delete(req, res) {
    const { id } = req.params
    log.debug('delete.Message', { id })

    db.Message.destroy({ where: { id }})
      .then(data => {
        log.debug('delete.Message', data)
        if (data <= 0) {
          return responseHandler.handle404(res, `Failed to delete Message with id ${id}. Not found.`)
        }
        return responseHandler.handle200(res, { msg: 'Message deleted'})
      })
      .catch(err => {
        log.error('delete.Message error', err)
        return responseHandler.handleErr(err, res)
      })
  },

  create(req, res) {
    const message = req.body
    log.debug('create.Message', { message } )
    db.Message.create(message)
      .then(data => {
        log.debug('create.Message', { data })
        return responseHandler.handle201(res, { id: data.id })
      })
      .catch(err => {
        log.error('create.Message error', { err })
        return responseHandler.handleErr(err, res)
      })
  },

  update(req, res) {
    const message = req.body
    const { id } = req.params
    log.debug('update.Message', { message, id })
    db.Message.update(message, {
      where: { id },
      fields: ['receiverID', 'senderID', 'message', 'status'],
    }).then(data => {
      log.debug('update.Message', { data })
      if (data[0] > 0) {
        return responseHandler.handle200(res, { id: Number(id) })
      }
      return responseHandler.handle404(res, `Could update message with id ${id}`)
    }).catch(err => {
      log.error('update.Message error', { err })
      return responseHandler.handleErr(err, res)
    })
  },

  messages(req, res) {
    db.Message.findAll()
      .then(data => {
        log.debug('all.Message', { data })
        return responseHandler.handle200(res, data)
      })
      .catch(err => {
        log.error('all.Message error', { err })
        return responseHandler.handleErr(err, res)
      })
  },

  message(req, res) {
    const { id } = req.params
    db.Message.findById(id)
      .then(data => {
        log.debug('one.Message', { data })
        if (data) {
          return responseHandler.handle200(res, data)
        }
        return responseHandler.handle404(res, `Message with id ${id} not found.`)
      })
      .catch(err => {
        log.error('one.Message error', { err })
        return responseHandler.handleErr(err, res)
      })
  },
}
