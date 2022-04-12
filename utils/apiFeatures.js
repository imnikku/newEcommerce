class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    // search data .........................
    search(){
        const keyword=this.queryStr.keyword?{
            $or:[ {
                name:{
                $regex:this.queryStr.keyword,
                $options:"i"
            }
        },
            {
                description:{
                $regex:this.queryStr.keyword,
                $options:"i"
            },
        }]
           
        }:{};
        this.query=this.query.find({...keyword});
        return this;
    }
// filter data ................
    filter(){
        const queryCopy={...this.queryStr};
        const removeFields=['keyword','page','limit'];
        removeFields.forEach(key=>delete queryCopy[key]);


        let queryString=JSON.stringify(queryCopy);
        queryString=queryString.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`)
        console.log(JSON.parse(queryString))
        this.query=this.query.find(JSON.parse(queryString));
        return this;
    }
}

module.exports=ApiFeatures;