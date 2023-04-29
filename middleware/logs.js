//dependency
const request = (req,res,next) =>{
    let newDate = new Date(Date.now());
    console.log(`Path ${req.originalUrl} , method ${req.method} ------${newDate.toDateString()}`);
    //can be access by next function the baseUrl 
    req.requestTime = Date.now();
    next();  
} 

module.exports = request ;