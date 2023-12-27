// This function is the endpoint's request handler.
exports = async function (request, response) {
   try {
    const { collectionName, queryParams } = request.query;
    if(collectionName === '1a750d88-2747-11ed-a261-0242ac120002') {
       return { ok: 'Prohibited' };
    }
    const searchObjectsRaw = queryParams ? queryParams.split('*') : [];
    var searchObjects = {};
    for (let i = 0; i < searchObjectsRaw.length; i++) {
      const pieces = searchObjectsRaw[i].split("=");
      const key = pieces[0];
      const value = pieces[1];
      searchObjects[key] = value;
    }
    if(collectionName.includes("exclusive7118")) {
     searchObjects['paid'] = true;
     const result2 = await context.services.get("mongodb-atlas").db("myDb").collection(collectionName).find(searchObjects).toArray();
     response.setBody(JSON.stringify(result2));
    } else {
      const result = await context.services.get("mongodb-atlas").db("myDb").collection(collectionName).find(searchObjects).toArray();
      response.setBody(JSON.stringify(result));
    }
  } catch (err) {
    return { ok: err };
  }
};
