import mongoose from 'mongoose'
type ConnectionInstance={
    isConnected?:number
}
const connection:ConnectionInstance={}
const dbConnect=async ():Promise<void>=>{
        if(connection.isConnected){
            console.log("Already connected")
            return;
        }
        try {
            const db= await mongoose.connect(process.env.MONGODB_URI as string)
            connection.isConnected=mongoose.connections[0].readyState
            console.log("Db connected");            
            
        } catch (error:any) {
            console.log(error.message)
            throw error
        }
        
}

export default dbConnect