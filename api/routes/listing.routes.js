import { Router } from 'express'
import { createListing, deleteupload, getListing, updateListing, uploadImage,getListings } from '../controllers/listing.controller.js';
import JWTverify from '../middleware/JWTverify.js';
import { upload } from '../middleware/multer.js';
import { deletelisting } from '../controllers/listing.controller.js';
const ListingRoutes =  Router();

ListingRoutes.post("/create_listing",JWTverify,createListing);
ListingRoutes.post ("/upload_Image",JWTverify,
    upload.fields([{
        name:"file",
        maxCount:6,
    }])
,uploadImage);
ListingRoutes.post("/delete_Image",JWTverify,deleteupload);
ListingRoutes.post("/delete",JWTverify,deletelisting);
ListingRoutes.post("/update/:id",JWTverify,updateListing);
ListingRoutes.get('/getListing/:id',getListing);
ListingRoutes.get('/get', getListings);
export { ListingRoutes }