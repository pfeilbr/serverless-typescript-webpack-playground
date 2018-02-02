"use strict";

import * as AWS from "aws-sdk";
import * as fetch from "isomorphic-fetch";
import * as uuidv4 from "uuid/v4";
import * as config from "./config";

export async function scan(event, context, callback) {

  console.log("event", JSON.stringify(event, null, 2));

  const client = new AWS.DynamoDB();

  const resp = await client.query({
    ExpressionAttributeNames: {
      "#b": "bucket",
    },
    ExpressionAttributeValues: {
      ":bucket": { S: "01" },
    },
    IndexName: "Bucket01TimeIdx",
    KeyConditionExpression: "#b = :bucket", //  and #t > :num
    ScanIndexForward: false, // sort descending / most recent log items are first
    TableName: "log",
  }).promise();

  const response = {
    body: JSON.stringify(resp, null, 2),
    statusCode: 200,
  };

  callback(null, response);
}

export async function put(event, context, callback) {
  console.log("event", JSON.stringify(event, null, 2));
  const client = new AWS.DynamoDB.DocumentClient();
  const now = new Date();

  const Item = Object.assign(
    {},
    {
      bucket: "01", // hard coded to support the "Bucket01TimeIdx" global index. supports sorting by time descending
      id: uuidv4(),
      time: now.getTime(),
      timeISOString: now.toISOString(),
      timeUTCString: now.toUTCString(),
    },
    JSON.parse(event.body));
  const resp = await client.put({ TableName: "log", Item }).promise();
  const response = {
    body: JSON.stringify(resp, null, 2),
    statusCode: 200,
  };

  callback(null, response);
}

export async function generateRandomLogItem(event, context, callback) {
  try {
    const resp = await fetch(config.apiBaseURL, {
      body: JSON.stringify({
        msg: `${(new Date()).toUTCString()} - generated random log item`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    callback(null, resp);
  } catch (err) {
    console.error(err);
    return callback(err);
  }
}
