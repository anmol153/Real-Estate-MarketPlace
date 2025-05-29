import { Router } from 'express'
import { createListing } from '../controllers/listing.controller.js';
import JWTverify from '../middleware/JWTverify.js';

const ListingRoutes =  Router();

ListingRoutes.post("/create",JWTverify,createListing);

export { ListingRoutes }