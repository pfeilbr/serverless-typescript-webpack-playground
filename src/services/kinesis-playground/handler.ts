"use strict";

import * as AWS from "aws-sdk";

export async function put(event, context, callback) {
  console.log("event", JSON.stringify(event));

  try {
    const client = new AWS.Kinesis();
    const resp = await client.putRecord({
      Data: event.body,
      PartitionKey: "01",
      StreamName: process.env.EVENTS_STREAM_NAME,
    }).promise();

    const response = {
      body: JSON.stringify({
        input: event,
        output: JSON.stringify(resp),
      }, null, 2),
      statusCode: 200,
    };
    callback(null, response);
  } catch (err) {
    console.error(err);
    return callback(err);
  }

}

export async function processStreamEvent(event, context, callback) {
  try {
    console.log("event", JSON.stringify(event));
    const response = {
      body: JSON.stringify({}, null, 2),
      statusCode: 200,
    };
    callback(null, response);
  } catch (err) {
    console.error(err);
    return callback(err);
  }
}

export async function processStreamEvent2(event, context, callback) {
  try {
    console.log("event", JSON.stringify(event));
    const response = {
      body: JSON.stringify({}, null, 2),
      statusCode: 200,
    };
    callback(null, response);
  } catch (err) {
    console.error(err);
    return callback(err);
  }
}

