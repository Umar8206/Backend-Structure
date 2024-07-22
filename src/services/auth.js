import { signInValidation, signUpValidation } from '../validations/schema/auth.js'
import { addUser, findUserByEmail, updateUserById } from "../repositries/user.js";
import { ReasonPhrases } from "http-status-codes";
import bcrypt from "bcryptjs"
import { generateToken } from "../helpers/token.js";
import joi from "../validations/joi.js"
import validate from '../validations/joi.js';

export const signInService = async (payload) => {

    validate(payload, signInValidation);
    let user;
    user = await findUserByEmail(payload?.email)
    if (!user?._id) throw new Error("User Not Found")
    else {
        const isMatch = await bcrypt.compare(payload?.password, user?.password);
        if (!isMatch) throw Error("User Not Found")
        if (!user.isVerified) {
            user.token = await generateToken({ _id: user?._id, userType: user?.userType })
        }

        const updatedUser = await updateUserById(user?._id, { ...user, ...payload })
        return updatedUser
    }
}


export const signUpService = async (payload) => {

    validate(payload, signUpValidation);
    let user;
    let createPayload={...payload}
    user = await findUserByEmail(payload?.email)
    if (user?._id) throw new Error("User Already Exist")
        if(payload?.password!==payload?.confirmPassword) throw Error("Password Not Matched")
    else {
        const salt = await bcrypt.genSalt(10);
        createPayload.password = await bcrypt.hash(payload?.password, salt); 
        createPayload.token =await generateToken({ _id: user?._id, userType: payload?.userType })
         user = await addUser(createPayload);
        return user
    }
} 
