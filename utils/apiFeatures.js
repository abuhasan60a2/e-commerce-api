class APIFeatures{
    constructor(query, queryObject){
        this.query = query;
        this.queryObject = queryObject;
    }
    filter(){
        //1A) Filtering
        //destructure the req.query and make a copy of it using spread operator
        const queryObj = {...this.queryObject};
        //exclude the fields from the query
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        //delete the excluded fields from the queryObj
        excludedFields.forEach(element => delete queryObj[element]);

        //1B) Advance Filtering
        let queryObject = JSON.stringify(queryObj);
        //queryObject replaces gt|gte|lt|lte with $gt|$gte|$lt|$lte using regular expression
        queryObject = queryObject.replace(/\b(gt|gte|lt|lte)\b/g, match =>`$${match}`);

        // first return query for further chaining the query
        this.query = this.query.find(JSON.parse(queryObject));
        return this;
        
    }
    sort(){
        if(this.queryObject.sort){
            const sortBy = this.queryObject.sort.split(','). join(' ');
            this.query = this.query.sort(sortBy);
            console.log(sortBy);
        }
        return this;
    }
    limitFields(){
        if(this.queryObject.fields){
            const fields = this.queryObject.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        }
        else{
            //exclude the __v field from the query
            this.query = this.query.select('-__v');
        }
        return this;
    }
    paginate(itemTotal){
        if(this.queryObject.page || this.queryObject.limit){
            const page = this.queryObject.page * 1 || 1;
            console.log(page);
            //skip the first 10 results and show the next 10 results
            const limit = this.queryObject.limit * 1 || 1;
            console.log(limit);
            const skip = page * limit - limit;
            this.query = this.query.skip(skip).limit(limit);
            if(page*limit > itemTotal){
                throw new Error("This page does not exist");
            }
            //return the query for further chaining
            return this
        }
        else{
            this.query = this.query.skip(0).limit(10);
            //return the query for further chaining
            return this;
        }
    }

}
module.exports = APIFeatures;