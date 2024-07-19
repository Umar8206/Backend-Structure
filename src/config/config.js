import dotenv from 'dotenv'
import path from 'path'
import Joi from 'joi'
import { fileURLToPath } from 'url'

import { environments } from '../constants/app.js'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.join(__dirname, '../../.env') })

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string()
            .valid(...Object.values(environments))
            .required(),
        PORT: Joi.number().required().default(3000),
        JWT_SECRET: Joi.string().required().description('JWT secret key'),
        BYPASS_PUSH_NOTIFICATION: Joi.boolean().default(false),
        DEFAULT_OTP: Joi.number().required().default(2022),

        // Database
        MONGODB_URL: Joi.string().required().description('Mongo DB url'),

        // SMTP
        SMTP_HOST: Joi.string().description('server that will send the emails'),
        SMTP_PORT: Joi.number().description('port to connect to the email server'),
        SMTP_USERNAME: Joi.string().description('username for email server'),
        SMTP_PASSWORD: Joi.string().description('password for email server'),
        SMTP_EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),

        // Google
        // GOOGLE_MAPS_API_KEY: Joi.string().required().description('Google maps apikey'),

        // Monty
        // MONTY_USERNAME: Joi.string().required().description('Monty username'),
        // MONTY_APIID: Joi.string().required().description('Monty app id'),
        // MONTY_SOURCE: Joi.string().required().description('Monty sms source'),
    })
    .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
    throw new Error(`Config validation error: ${error.message}`)
}

export default {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    app: {
        accessKey: envVars.API_ACCESS_KEY,
        appHash: envVars.APPLICATION_HASH,
        bypassPushNotifications: envVars.BYPASS_PUSH_NOTIFICATION,
        defaultOtp: '0000',
    },

    pagniation: {
        limit: 10,
        maxLimit: 50,
    },
    mongoose: {
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : 'back'),
        options: {
        },
    },
    jwt: {
        secret: envVars.JWT_SECRET,
    },
    email: {
        smtp: {
            host: envVars.SMTP_HOST,
            port: envVars.SMTP_PORT,
            auth: {
                user: envVars.SMTP_USERNAME,
                pass: envVars.SMTP_PASSWORD,
            },
        },
        from: envVars.SMTP_EMAIL_FROM,
    },
    google: {
        mapsApiKey: envVars.GOOGLE_MAPS_API_KEY,
    },
    monty: {
        userName: envVars.MONTY_USERNAME,
        appId: envVars.MONTY_APIID,
        source: envVars.MONTY_SOURCE,
    },
}
