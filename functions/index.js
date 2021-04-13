const functions = require("firebase-functions");
exports.GeneratePdf = functions.https.onCall((data, context) => {
    console.log(data);
    console.log(context);
    return;
});