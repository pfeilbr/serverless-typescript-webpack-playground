example showing how to use API Gateway API keys in `serverless.yml`

```
  apiKeys:
    - ${self:provider.stage}-api-gateway-api-key-example
```


mark `private: true` on http.event