export class APIFeatures {
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search(){
        let keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};

        this.query.find({...keyword})
        return this;
    }

    paginate(productPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = productPerPage * currentPage - 1;
        this.query.limit(productPerPage).skip(skip)

        return this;
    }
}