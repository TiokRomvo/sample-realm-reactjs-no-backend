// This function is the endpoint's request handler.
exports = async function (request, response) {
  try {
    const { collectionName } = request.query;
    const docs = JSON.parse(request.body.text());
    const theIpAddress = request.headers['X-Forwarded-For'];
   
    if(collectionName.includes("exclusive7118")) {
        return { ok: 'Prohibited' };
    } else {
      const result = await context.services.get("mongodb-atlas").db("myDb").collection(collectionName).inserMany(docs);
      response.setBody(JSON.stringify(result));
    }
  } catch (err) {
    return { ok: err };
  }
};
