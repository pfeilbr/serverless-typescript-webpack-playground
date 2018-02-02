# serverless-typescript-webpack-playground

project to learn/explore [serverless](https://serverless.com/) + [typescript](https://www.typescriptlang.org/) + [webpack](https://webpack.js.org/)

## Session

example testing and deployment session

```sh
# cd to service dir
cd src/services/logger

# local test
../../../node_modules/.bin/sls webpack invoke -f scan --data '{"key1":"value1", "key2":"value2"}'

# deploy
../../../node_modules/.bin/sls deploy

# test logger endpoint - create log item
curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST https://4qodphulj8.execute-api.us-east-1.amazonaws.com/dev/logger

# lambda-limits service

# invoke concurrent lambda executions test
# ***warning** understand/check resource usage
curl -X POST https://m1v5komsge.execute-api.us-east-1.amazonaws.com/dev/lambda-limits/concurrent

# kinesis-playground
# PUT record
curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST https://ijkemqb2r8.execute-api.us-east-1.amazonaws.com/dev/stream/put

# tail remote logs
../../../node_modules/.bin/sls logs -f hello -t
```

## Notes

* updated `tsconfig.json` with `"target": "es2015"`
* needed to add the following for webpack + awesome-typescript-loader to run without errors

    ```sh
    yarn add @types/node --dev
    yarn add @types/async --dev
    ```