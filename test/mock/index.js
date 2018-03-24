const faker = require('faker')
const modelConstant = require('../../server/models/constants')

const mockContact = {
  valid1: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    mobileNumber: faker.phone.phoneNumberFormat(),
  },
  valid2: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    mobileNumber: faker.phone.phoneNumberFormat(),
  },
  valid3: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    mobileNumber: faker.phone.phoneNumberFormat(),
  },
  valid4: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    mobileNumber: faker.phone.phoneNumberFormat(),
  },
  invalid1: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  },
  invalid2: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    mobileNumber: faker.phone.phoneNumberFormat(),
  }
}

const mockMessage = {
  noStatus: {
    message: faker.lorem.text()
  },
  read1: {
    message: faker.lorem.text(),
    status: modelConstant.SMS_STATUS_READ,
  },
  read2: {
    message: faker.lorem.text(),
    status: modelConstant.SMS_STATUS_READ,
  },
  unread1: {
    message: faker.lorem.text(),
    status: modelConstant.SMS_STATUS_UNREAD,
  },
  unread2: {
    message: faker.lorem.text(),
    status: modelConstant.SMS_STATUS_UNREAD,
  },
  noMsgContent: {}
}

module.exports = { mockContact, mockMessage }
