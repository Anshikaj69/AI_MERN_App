import mongoose from 'mongoose'

const connectDb =  async(url) =>{
    mongoose.set('strictQuery', true)

    try{
    const connect =await mongoose.connect(url)
    console.log("connected" , connect.connection.host)

    }catch(err){
        console.log(err)
        process.exit(1)
    }

}
export default connectDb