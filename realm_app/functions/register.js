// This function is the endpoint's request handler.
exports = async function (request, response) {
  try {
    const theIpAddress = request.headers['X-Forwarded-For'];
    const doc = JSON.parse(request.body.text());
    if(theIpAddress && theIpAddress.length > 0) {
      doc.ipAdress = theIpAddress[0];
    }
    
    const result = codeName === "_exclusive7118" ?
      await context.services.get("mongodb-atlas").db("myDb").collection('1a750d88-2747-11ed-a261-0242ac120002').insertOne(doc)
      :
     await context.services.get("mongodb-atlas").db("myDb").collection('057bb5de-2b35-11ed-a261-0242ac120002').insertOne(doc)
      ;
    response.setBody(JSON.stringify(result));
  } catch (err) {
    return { ok: err };
  }
};
