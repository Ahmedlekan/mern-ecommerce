import express,{Request, Response} from  "express"
import User from "../models/user"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import {check, validationResult} from "express-validator"
import verifyToken from "../middlewares/auth"

const router = express.Router()

router.post("/login",
    [
        check("email", "Email is required").isString(),
        check("password", "Password with 6 or more characters is required").isLength({min: 6})
    ], async(req:Request, res:Response)=>{

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({mesage: errors.array()})
    }

    try {

        const {email, password} = req.body

        const user = await User.findOne({email})

        if (!user){
            return res.status(400).json({message: "Invalid Credentials"})
        }

        const checkPassword = await bcrypt.compare(password, user.password)

       if (checkPassword){
            const tokenData = {
                userId : user._id
            }

            const token = jwt.sign(
                tokenData, 
                process.env.JWT_SECRET_KEY as string, 
                {expiresIn:"1d"}
            )
     
            res.cookie("auth_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                maxAge: 86400000,
            })
            return res.status(200).json({userId: user._id})
       } else {
        throw new Error("Please check Password")
       }



        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Something went wrong"})
    }

})

// to know if our cookies is validated or not
router.get("/validate-token", verifyToken, (req: Request, res: Response)=>{
    res.status(200).send({userId: req.userId})
})


router.post("/logout", (req: Request, res: Response)=>{
    res.cookie("auth_token", "", {
        expires: new Date(0)
    })
    res.send()
})

export default router