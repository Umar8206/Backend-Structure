import mongoose from 'mongoose'

const transactionMiddleware = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    req.mongoSession = session

    try {
        await next()
        if (!res.headersSent) {
            await session.commitTransaction()
        } else {
            await session.abortTransaction()
        }
    } catch (error) {
        await session.abortTransaction()
        next(error)
    } finally {
        session.endSession()
    }
}
export default transactionMiddleware
