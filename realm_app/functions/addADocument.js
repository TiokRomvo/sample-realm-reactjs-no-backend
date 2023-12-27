// This function is the endpoint's request handler.
exports = async function (request, response) {
  try {
    const { collectionName } = request.query;
    const doc = JSON.parse(request.body.text());
    const theIpAddress = request.headers['X-Forwarded-For'];
    if(theIpAddress) {
      doc.ipAddress = theIpAddress.length > 0 ? theIpAddress[0] : "N/A";
    }
    doc.createdOn = new Date();
    if(collectionName.includes("exclusive7118")) {
      const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
      let code = '';
      const codeLength = Math.floor(Math.random() * (13 - 5 + 1) + 5)
      const charactersLength = characters.length;
      for ( let i = 0; i < codeLength ; i++ ) {
          code += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      doc.code = code;
      var searchObjects2 = {};
      const { email, thePart } = request.query;
      if(email && thePart) {
        searchObjects2.email = email;
        searchObjects2.password = thePart;
        const result = await context.services.get("mongodb-atlas").db("myDb").collection('1a750d88-2747-11ed-a261-0242ac120002').findOne(searchObjects2);
        if(!result) {
          return { ok: 'Prohibited' };
        } else {
           doc.paid = false;
           doc.editReviewed = true;
           doc.createdBy = email;
           const result = await context.services.get("mongodb-atlas").db("myDb").collection(collectionName).insertOne(doc);
           response.setBody(JSON.stringify({result, code}));
        }
      } else {
        return { ok: 'Prohibited' };
      }
    } else {
      const result = await context.services.get("mongodb-atlas").db("myDb").collection(collectionName).insertOne(doc);
      response.setBody(JSON.stringify(result));
    }
  } catch (err) {
    return { ok: err };
  }
};
