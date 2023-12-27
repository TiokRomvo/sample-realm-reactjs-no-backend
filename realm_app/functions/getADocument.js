// This function is the endpoint's request handler.
exports = async function (request, response) {
   try {
    const { collectionName,queryParams, id } = request.query;
     if(collectionName === '1a750d88-2747-11ed-a261-0242ac120002') {
       return null ;
    }
    const searchObjectsRaw = queryParams ? queryParams.split('*') : [];
    var searchObjects = {};
    for (let i = 0; i < searchObjectsRaw.length; i ++) {
      const pieces = searchObjectsRaw[i].split("=");
      const key = pieces[0];
      const value = pieces[1];
      searchObjects[key] = value;
    }
    if(id) {
      const theId =new BSON.ObjectId(id)
      searchObjects._id = theId;
    }
    if(collectionName.includes("exclusive7118")) {
      var searchObjects2 = {};
      const { email, thePart } = request.query;
      if(email && thePart) {
        searchObjects2.email = email;
        searchObjects2.password = thePart;
        const result = await context.services.get("mongodb-atlas").db("myDb").collection('1a750d88-2747-11ed-a261-0242ac120002').findOne(searchObjects2);
        if(!result) {
          return null ;
        } else {
          if(result.role === 'admin') {
           const result2 = await context.services.get("mongodb-atlas").db("myDb").collection(collectionName).findOne(searchObjects);
           response.setBody(JSON.stringify(result2));
          } else {
           searchObjects['paid'] = true;
           const result2 = await context.services.get("mongodb-atlas").db("myDb").collection(collectionName).findOne(searchObjects);
           response.setBody(JSON.stringify(result2));
          }
        }
      } else {
         searchObjects['paid'] = true;
         const result2 = await context.services.get("mongodb-atlas").db("myDb").collection(collectionName).findOne(searchObjects);
         response.setBody(JSON.stringify(result2));
      }
    } else {
      const result = await context.services.get("mongodb-atlas").db("myDb").collection(collectionName).findOne(searchObjects);
      response.setBody(JSON.stringify(result));
    }
  } catch (err) {
    return { ok: err };
  }
};
