class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    // search(){
    //    let keyword =  this.queryStr.keyword ? {
    //         name: {
    //             $regex: this.queryStr.keyword,
    //             $options: 'i'
    //         }
    //    }: {};
    
    //    this.query.find({...keyword})
    //    return this;
    // }
    
    // filter(){
    //     const queryStrCopy = { ...this.queryStr };
  
    //     //removing fields from query
    //     const removeFields = ['keyword', 'limit', 'page'];
    //     removeFields.forEach( field => delete queryStrCopy[field]);
        
    //     let queryStr = JSON.stringify(queryStrCopy);
    //     queryStr =  queryStr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`)

    //     this.query.find(JSON.parse(queryStr));

    //     return this;
    // }

    search() {
        const keyword = this.queryStr.keyword && this.queryStr.keyword.trim() !== ''
            ? {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: 'i'
                }
            }
            : {};

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryStrCopy = { ...this.queryStr };

    const removeFields = ['keyword', 'limit', 'page'];
    removeFields.forEach(field => delete queryStrCopy[field]);

    // Convert queryStrCopy into MongoDB-compatible filter object
    const filters = {};

    for (let key in queryStrCopy) {
        if (key.includes('[')) {
            // Handle operators like price[gte]
            const [field, operator] = key.split('[');
            const cleanOperator = operator.replace(']', '');

            if (!filters[field]) filters[field] = {};
            filters[field][`$${cleanOperator}`] = Number(queryStrCopy[key]); // convert to number
        } else {
            filters[key] = queryStrCopy[key];
        }
    }

    this.query = this.query.find(filters);
    
    return this;
    }


    paginate(resPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1)
        this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures;