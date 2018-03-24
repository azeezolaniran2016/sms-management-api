const db = require('../models')
const log = require('../util/logger')
const responseHandler = require('../util/responseHandler')


module.exports = {
  delete(req, res) {
    const { id } = req.params
    log.debug('delete.Contact', { id })

    db.Contact.destroy({ where: { id }})
      .then(data => {
        log.debug('delete.Contact', data)
        if (data <= 0) {
          return responseHandler.handle404(res, `Failed to delete Contact with id ${id}. Not found.`)
        }
        responseHandler.handle200(res, { msg: 'Contact deleted'})
      })
      .catch(err => {
        log.error('delete.Contact error', err)
        return responseHandler.handleErr(err, res)
      })
  },

  create(req, res) {
    const contact = req.body
    log.debug('create.Contact', { contact } )
    db.Contact.create(contact)
      .then(data => {
        log.debug('create.Contact', { data })
        return responseHandler.handle201(res, { id: data.id })
      })
      .catch(err => {
        log.error('create.Contact error', { err })
        return responseHandler.handleErr(err, res)
      })
  },

  update(req, res) {
    const contact = req.body
    const { id } = req.params
    log.debug('update.Contact', { contact, id })
    db.Contact.update(contact, {
      where: { id },
      fields: ['firstName', 'lastName', 'mobileNumber'],
    }).then(data => {
      log.debug('update.Contact', { data })
      if (data[0] > 0) {
        return responseHandler.handle200(res, { id: Number(id) })
      }
      return responseHandler.handle404(res, `Could update contact with id ${id}`)
    }).catch(err => {
      log.error('update.Contact error', { err })
      return responseHandler.handleErr(err, res)
    })
  },

  contacts(req, res) {
    db.Contact.findAll()
      .then(data => {
        log.debug('all.Contact', { data })
        return responseHandler.handle200(res, data)
      })
      .catch(err => {
        log.error('all.Contact error', { err })
        return responseHandler.handleErr(err, res)
      })
  },

  contact(req, res) {
    const { id } = req.params
    db.Contact.findById(id)
      .then(data => {
        log.debug('one.Contact', { data })
        if (data) {
          return responseHandler.handle200(res, data)
        }
        return responseHandler.handle404(res,  `Contact with id ${id} not found.`)
      })
      .catch(err => {
        log.error('one.Contact error', { err })
        return responseHandler.handleErr(err, res)
      })
  },
}
