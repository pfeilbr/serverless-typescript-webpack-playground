"use strict";

export function hello(event, context, callback) {
  console.log("event", JSON.stringify(event));
  const response = {
    body: JSON.stringify({
      input: event,
      message: "Go Serverless v1.0! Your function executed successfully!",
    }, null, 2),
    statusCode: 200,
  };

  callback(null, response);
}
