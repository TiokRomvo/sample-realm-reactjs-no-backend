// This function is the endpoint's request handler.
exports = async function (request, response) {
   try {
    const { email, thePart, codeName } = request.query;
    var searchObjects = {};
    if(email && thePart) {
      searchObjects.email = email;
      searchObjects.password = thePart;
    }
    if(codeName === "") {
    
    } else {
      
    }
    const result = codeName === "_exclusive7118" ? 
      await context.services.get("mongodb-atlas").db("myDb").collection('1a750d88-2747-11ed-a261-0242ac120002').findOne(searchObjects)
      :
      await context.services.get("mongodb-atlas").db("myDb").collection('057bb5de-2b35-11ed-a261-0242ac120002').findOne(searchObjects)
      ;
    const success = result ? true : null;
    response.setBody(JSON.stringify(success));
  } catch (err) {
    return { ok: err };
  }
};