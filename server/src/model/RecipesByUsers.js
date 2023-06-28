import mongoose from "mongoose";

const {Schema} = mongoose

const recipeSchema = new Schema({
    title:{
        type: String,
        required:true
    }, 
    category:{
        type: String,
        required:true
    },
    ingredients: [
        {
            type: String,
            required:true
        }
    ],
    instructions: 
        {
            type: String,
            required:true
        }
    ,
    image: {
        type: String,
        required: true
    },
        
    userOwner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
})

export default mongoose.model('Recipebyuser', recipeSchema)