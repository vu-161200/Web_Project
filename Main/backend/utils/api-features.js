class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          //filter by name
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    let address;
    const queryAnd = [];

    const queryCopy = { ...this.queryStr };
    //  Removing some fields
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter address
    if (queryCopy["address"]) {
      address = queryCopy["address"];

      address.split(", ").forEach((key) => {
        var reg = new RegExp(key.trim());
        queryAnd.push({ address: { $regex: reg } });
      });

      delete queryCopy["address"];
    }

    // Filter For Price, Rating, Area
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = address
      ? this.query.find(JSON.parse(queryStr)).and(queryAnd)
      : this.query.find(JSON.parse(queryStr));

    /*
      // Tỉnh / Thành phố     Quận / Huyện / Thị xã     Xã / Phường / Thị trấn
 
      var searchTerms = "app oranges".split(" ");
      var arr = [];
      searchTerms.forEach(function(i){
      var reg = new RegExp("^"+i);
      arr.push({"names":{$regex:reg}});
      })
      db.collection.find({$and:arr});
    */

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
