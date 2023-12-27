// This function is the endpoint's request handler.
exports = async function (request, response) {
   try {
    const { lambda } = request.query;
    if(lambda) {
      const collectionName = "advertisement_exclusive7118";
      const { email, thePart } = request.query;
      var searchObjects = {};
      if(email && thePart) {
        searchObjects.email = email;
        searchObjects.password = thePart;
      }
      const result = await context.services.get("mongodb-atlas").db("myDb").collection('1a750d88-2747-11ed-a261-0242ac120002').findOne(searchObjects);
      if(result) {
         const theIpAddress = request.headers['X-Forwarded-For'];
         const original = await context.services.get("mongodb-atlas").db("myDb").collection(collectionName).findOne({code:lambda});
         if(theIpAddress) {
            original.approvedByIpAddress = theIpAddress.length > 0 ? theIpAddress[0] : "N/A";
          }
          original.updatedAt = new Date();
          original.approvedBy = email;
          original.paid = true;
          original.editReviewed = true;
         if(original.history) {
           const history = original.history;
           history.push(original);
           original.history = history;
         } else {
           const history = [];
           history.push(original);
           original.history = history;
         }
         const theId = original._id;
          const result2 = await context.services.get("mongodb-atlas").db("myDb").collection(collectionName).updateOne({_id: theId}, {$set:original});
          response.setBody(JSON.stringify({data: theId}));
      }
    } else {
      response.setBody({ok:"Lambda encounters an error"});
    }
  } catch (err) {
    return { ok: err };
  }
};