import app from '../app.mjs'
import { bootstrap } from '../bootstrap/index.js'
import config from '../config/config.js'

let server
bootstrap().then(() => {
    console.info('Starting server')
    server = app.listen(config.port, () => {
        console.info(`Listening to port ${config.port}`)
    })
})
