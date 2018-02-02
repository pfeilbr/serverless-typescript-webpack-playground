"use strict";

import * as AWS from "aws-sdk";
import * as fetch from "isomorphic-fetch";
import * as _ from "lodash";
import * as uuidv4 from "uuid/v4";
import * as config from "./config";

export async function concurrentInvokeAsync(event, context, callback) {
  const client = new AWS.Lambda();
  const promises = _.range(config.concurrentInvokations).map(async (index) => {
    return client.invoke({
      FunctionName: "logger-dev-put",
      InvocationType: "Event",
      Payload: JSON.stringify({body: JSON.stringify({index})}),
    }).promise();
  });
  const resp = await Promise.all(promises);
  const response = {
    body: JSON.stringify(resp, null, 2),
    statusCode: 200,
  };

  callback(null, response);
}

// export async function asyncTask(event, context, callback) {
//   const client = new AWS.DynamoDB();

//   const resp = await client.query({
//     ExpressionAttributeNames: {
//       "#b": "bucket",
//     },
//     ExpressionAttributeValues: {
//       ":bucket": { S: "01" },
//     },
//     IndexName: "Bucket01TimeIdx",
//     KeyConditionExpression: "#b = :bucket", //  and #t > :num
//     ScanIndexForward: false, // sort descending / most recent log items are first
//     TableName: "log",
//   }).promise();

//   const response = {
//     body: JSON.stringify(resp, null, 2),
//     statusCode: 200,
//   };

//   callback(null, response);
// }
