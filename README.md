# serverless-typescript-webpack-playground

```sh
# cd to service dir
cd src/services/logger

# local test
../../../node_modules/.bin/sls webpack invoke -f scan --data '{"key1":"value1", "key2":"value2"}'

# deploy
../../../node_modules/.bin/sls deploy

# test logger endpoint - create log item
curl -d '{"key1":"value1", "key2":"value2"}' -H "Content-Type: application/json" -X POST https://qkygujm7y8.execute-api.us-east-1.amazonaws.com/dev/logger
```

## Notes

needed to add the following for webpack + awesome-typescript-loader to run without errors

```sh
yarn add @types/node --dev
yarn add @types/async --dev
```