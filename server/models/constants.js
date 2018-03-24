module.exports = {
  SMS_STATUS_READ: 'read',
  SMS_STATUS_UNREAD: 'unread',
  get SMS_STATUSES() {
     return [this.SMS_STATUS_READ, this.SMS_STATUS_UNREAD]
    }
}
