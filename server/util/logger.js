const { transports, createLogger, format } = require('winston')

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: format.combine(
    format.timestamp({format: 'YYYY-mm-dd HH:MM:ss.l'}),
    format.json(),
  ),
  transports: [
    new transports.Console(),
  ],
})


module.exports = logger
