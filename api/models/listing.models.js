import mongoose from "mongoose";

const ListingSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    address:{
        type:String,
        required: true,
    },
    regularPrice:{
        type:Number,
        required: true,
    },
    discountedPrice:{
        type:Number,
        required: false,
    },
    bathrooms:{
        type:Number,
        required: true,
    },
    bedrooms:{
        type:Number,
        required: true,
    },
    furnished:{
        type:Boolean,
        required  : true
    },
    parking:{
        type:Boolean,
        required: true,
    },
    type:{
        type:String,
        required: true,
        enum: ["rent", "sale"],
    },
    offer:{
        type:Boolean,
        required: false,
    },
    imageUrls:{
        type:[String],
        required: true,
    },
    userRef:{
        type: String,
        required: true,
    },
});

const Listing = mongoose.model("Listing", ListingSchema);
export { Listing };
