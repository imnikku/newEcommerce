const ProductModel=require('../model/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures =require('../utils/apiFeatures');

// get all product .............................
exports.getAllProducts=catchAsyncErrors(async(req,res)=>{
   const apiFeatures=new ApiFeatures(ProductModel.find(),req.query).search().filter()
    const  product=await apiFeatures.query;
    res.status(200).json({success:true,product});
    }
);
//  get product details ...................

exports.productDetails=catchAsyncErrors(async(req,res,next)=>{
    let product=await ProductModel.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product Not found",404))       
     } 
    res.status(200).json({success:true,product}) 
})





// create product ........................ Admin ...............

exports.createProduct=catchAsyncErrors(async(req,res)=>{
    
    const product=await ProductModel.create(req.body);
    res.status(201).json({success:true,product});
}
);
// update product ....................... Admin .....................
exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{
    let product=await ProductModel.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }
    product =await ProductModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    res.status(200).json({success:true,product})
});

// delete product ........................... Admin ............................ 

exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
    let product=await ProductModel.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product Not Found",404));  
    }
    await product.remove();
    res.status(200).json({success:true,message:"Product Deleted Successfully"}) 
}
);
