"use strict";

export function hello(event, context, callback) {
  console.log("event", JSON.stringify(event));
  const response = {
    body: JSON.stringify({
      input: event,
      message: "Hello from API key secured endpoint",
    }, null, 2),
    statusCode: 200,
  };

  callback(null, response);
}
