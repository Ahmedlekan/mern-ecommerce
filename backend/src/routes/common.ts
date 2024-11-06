import express,{Request, Response} from  "express"
import verifyToken from "../middlewares/auth"
import Feature from "../models/feature"

const router = express.Router()


//addFeatureImage,
router.post("/add", verifyToken, async (req:Request, res: Response)=>{

    try {

        const { image } = req.body;

        console.log(image, "image");

        const featureImages = new Feature({image});

        const userImage =  await featureImages.save();

        if(userImage){
            res.status(201).json({message: "Image added"});
        }
        
    } catch (error) {

        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
        
    }
})

//getFeatureImage,
router.get("/get", verifyToken, async (req:Request, res: Response)=>{

    try {

        const images = await Feature.find({});

        if(images){
            res.status(200).json({message: "Image fetched" });
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Something went wrong" });
    }
})


export default router