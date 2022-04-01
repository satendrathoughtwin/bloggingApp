import chalk from "chalk";
import mongoose from "mongoose";
const  connectDb = async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONOG_URI)
        if(connection){
            console.log(chalk.yellowBright(`Database is connected successfully`))
        }
    }
    catch(err){
        console.log(chalk.redBright(err.message))
    }
    
}

export default connectDb 