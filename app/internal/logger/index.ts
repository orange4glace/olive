import log4js, { Logger } from 'log4js'

log4js.configure({
  appenders: { olive: { type: 'file', filename: 'olive.log' } },
  categories: { default: { appenders: ['olive'], level: 'error' } }
})

const logger = log4js.getLogger('olive');

export {
  logger
}