const supertest = require('supertest')
const expect = require('chai').expect

const server = require('../../server/server')
const { mockContact, mockMessage } = require('../mock')
const {sequelize} = require('../../server/models')

const request = supertest(server)

before((done) => {
  sequelize
    .sync({force: true})
    .then(() => {
      done()
    })
})

after(() => {
  process.exit(0)
})

describe('sms-management-api', () => {
  it('POST /api/v1/contacts should create a new contact.', (done) => {
    request
      .post('/api/v1/contacts')
      .send(mockContact.valid1)
      .expect(201)
      .end((err, { body }) => {
        const { id } = body
        expect(id).to.not.be.undefined
        expect(id).to.be.a('number')
        expect(id).to.be.greaterThan(0)
        mockContact.valid1.id = id
        done()
      })
  })

  it('POST /api/v1/contacts should NOT create an invalid contact.', (done) => {
    request
      .post('/api/v1/contacts')
      .send(mockContact.invalid1)
      .expect(400, done)
  })

  it('POST /api/v1/contacts should NOT create an already existing contact.', (done) => {
    request
      .post('/api/v1/contacts')
      .send(mockContact.valid1)
      .expect(409, done)
  })

  it ('GET /api/v1/contacts should return all contacts created.', (done) => {
    request
      .get('/api/v1/contacts')
      .expect(200)
      .end((err, { body }) => {
        expect(body.length).to.equal(1)
        expect(body[0].id).to.equal(mockContact.valid1.id)
        done()
      })
  })

  it ('GET /api/v1/contacts/:id should NOT return a non-existing contact.', (done) => {
    request
      .get('/api/v1/contacts/-1')
      .expect(404, done)
  })

  it ('PUT /api/v1/contacts/:id should update data of a specific contact.', (done) => {
    request
      .put(`/api/v1/contacts/${mockContact.valid1.id}`)
      .send(mockContact.valid2)
      .expect(200)
      .end((err, { body }) => {
        expect(body.id).to.equal(mockContact.valid1.id)
        done()
      })
  })

  it ('PUT /api/v1/contacts/:id should NOT update data for a non-existing contact.', (done) => {
    request
      .put('/api/v1/contacts/-1')
      .send(mockContact.valid2)
      .expect(404, done)
  })

  it ('DELETE /api/v1/contacts/:id should delete the record of a specific contact.', (done) => {
    request
      .delete(`/api/v1/contacts/${mockContact.valid1.id}`)
      .expect(200)
      .end((err, res) => {
        request
          .get(`/api/v1/contacts/${mockContact.valid1.id}`)
          .expect(404, done)
      })
  })

  it ('DELETE /api/v1/contacts/:id should NOT delete a non-existing contact.', (done) => {
    request
      .delete(`/api/v1/contacts/${mockContact.valid1.id}`)
      .expect(404, done)
  })

  it ('POST /api/v1/messages should create a message with valid body.', (done) => {
    request
      .post('/api/v1/contacts')
      .send(mockContact.valid1)
      .expect(201)
      .end((err, { body }) => {
        mockContact.valid1.id = body.id
        request
          .post('/api/v1/contacts')
          .send(mockContact.valid2)
          .expect(201)
          .end((err, { body }) => {
            mockContact.valid2.id = body.id
            mockMessage.read1.senderID = mockContact.valid1.id
            mockMessage.read1.receiverID = mockContact.valid2.id
            request
              .post('/api/v1/messages')
              .send(mockMessage.read1)
              .expect(201)
              .end((err, { body }) => {
                const { id } = body
                expect(id).to.not.be.undefined
                expect(id).to.be.a('number')
                expect(id).to.be.greaterThan(0)
                mockMessage.read1.id = id
                done()
              })
          })
      })
  })

  it('POST /api/v1/messages should NOT create a message with invalid body.', (done) => {
    request
      .post('/api/v1/messages')
      .send(mockMessage.noMsgContent)
      .expect(400, done)
  })

  it ('GET /api/v1/messages should return all messages created.', (done) => {
    request
      .get('/api/v1/messages')
      .expect(200)
      .end((err, { body }) => {
        expect(body.length).to.equal(1)
        expect(body[0].id).to.equal(mockMessage.read1.id)
        done()
      })
  })

  it ('GET /api/v1/messages/:id should NOT return a non-existing message.', (done) => {
    request
      .get('/api/v1/message/-1')
      .expect(404, done)
  })

  it ('GET /api/v1/messages/:id should NOT return a non-existing message.', (done) => {
    request
      .get(`/api/v1/messages/${mockMessage.read1.id}`)
      .expect(200)
      .end((err, { body }) => {
        expect(body.id).to.equal(mockMessage.read1.id)
        done()
      })
  })

  it('PUT /api/v1/messages:id should update an existing message with valid body.', (done) => {
    request
      .put(`/api/v1/messages/${mockMessage.read1.id}`)
      .send(mockMessage.unread1)
      .expect(200)
      .end((err, { body}) => {
        expect(body.id).to.equal(mockMessage.read1.id)
        done()
      })
  })

  it('PUT /api/v1/messages/:id should not update a non-existing message.', (done) => {
    request
      .put('/api/v1/messages/-1')
      .send(mockMessage.unread2)
      .expect(404, done)
  })

  it('DELETE /api/v1/messages/:id should delete an existing message.', (done) => {
    request
      .delete(`/api/v1/messages/${mockMessage.read1.id}`)
      .expect(200, done)
  })

  it('DELETE /api/v1/messages/:id should not delete a non-existing message.', (done) => {
    request
      .delete('/api/v1/messages/-1')
      .expect(404, done)
  })

})
