const functions = require("firebase-functions");
const { logger } = require("firebase-functions");
const { PubSub } = require("@google-cloud/pubsub");

const pubsub = new PubSub({ projectId: process.env.GCLOUD_PROJECT });
const topicName = "create-pdf";

exports.GeneratePdf = functions.https.onCall(async (data, context) => {
    logger.info("data", { data });

    const userId = context.auth.uid;
    if (!userId) {
        throw new Error("unauthorized");
    }

    try {
        const messageId = await pubsub.topic(topicName)
            .publish(Buffer.from(JSON.stringify({ invoiceId: data })));
        console.log(`Message ${messageId} published.`);
    } catch (error) {
        console.error(`Received error while publishing: ${error.message}`);
        process.exitCode = 1;
    }

    return;
});
