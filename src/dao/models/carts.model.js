import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    products: 
        [{ /* 
        _id: {type: mongoose.Schema.Types.ObjectId, ref:"Products"}, */
        quantity: {type: Number}
    }]
})
/* 
cartSchema.pre('findOne',function(next){
    this.populate('products._id')
    next()
})
 */
export const cartsModel = mongoose.model("Carts", cartSchema)