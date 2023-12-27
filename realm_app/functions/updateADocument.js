// This function is the endpoint's request handler.
exports = async function (request, response) {
   try {
     const { collectionName, id } = request.query;
     if(collectionName === '1a750d88-2747-11ed-a261-0242ac120002') {
       return { ok: 'Prohibited' };
    }
    const doc = JSON.parse(request.body.text());
    const theId =new BSON.ObjectId(id)
    const theIpAddress = request.headers['X-Forwarded-For'];
    if(theIpAddress) {
      doc.updatedByIpAddress = theIpAddress.length > 0 ? theIpAddress[0] : "N/A";
    }
    doc.updatedAt = new Date();
    const { email, thePart } = request.query;
    var searchObjects = {};
    if(email && thePart) {
      searchObjects.email = email;
      searchObjects.password = thePart;
      doc.updatedBy = email;
    }
    const result = await context.services.get("mongodb-atlas").db("myDb").collection('1a750d88-2747-11ed-a261-0242ac120002').findOne(searchObjects);
    if(result) {
       const original = await context.services.get("mongodb-atlas").db("myDb").collection(collectionName).findOne({_id:theId});
        if(result.admin) {
        } else {
           if(collectionName.includes("exclusive7118")) {
            doc.paid = original.paid;
            doc.editReviewed = false;
          }
        }
       if(original.history) {
         const history = original.history;
         history.push(original);
         doc.history = history;
       } else {
         const history = [];
         history.push(original);
         doc.history = history;
       }
        const result2 = await context.services.get("mongodb-atlas").db("myDb").collection(collectionName).updateOne({_id: theId}, {$set:doc});
        doc["_id"] = id;
        response.setBody(JSON.stringify(doc));
    }
    response.setBody(null);
  } catch (err) {
    return { ok: err };
  }
};
