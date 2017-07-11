"use strict";

import * as AWS from "aws-sdk";
import * as uuidv4 from "uuid/v4";

export async function scan(event, context, callback) {
  const client = new AWS.DynamoDB();
  // const resp = await client.scan({TableName: "log"}).promise();

  const resp = await client.query({
    ExpressionAttributeNames: {
      "#b": "bucket",
      // "#t": "time",
    },
    ExpressionAttributeValues: {
      ":bucket": { S: "01" },
      // ":num": { N: "0" },
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
      id: uuidv4(),
      bucket: '01',
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
