# OpenAI Structured Outputs metaschema

[OpenAI Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs) ensure that model outputs conform to a JSON schema provided by the client, but it supports only a [subset](https://platform.openai.com/docs/guides/structured-outputs#supported-schemas) of JSON schemas. This repo offers a metaschema that validates a schema's conformance to many of OpenAI's constraints.

## Validated Constraints

| Constraint | Validated | Notes |
|------------|-----------|-------|
| Root objects must not be `anyOf` | ✅ |  |
| All fields must be required | ⚠️ | Only validates that `required` exists and is non-empty |
| Capped object count, nesting depth, total string size, enum size | ❌ | |
| `additionalProperties` must be set and `false` | ✅ | |
| String constraints not supported (`minLength`, `maxLength`, `pattern`, `format`) | ✅ | Rejected by metaschema. (OpenAI rejects when `strict: true`.) |
| Number constraints not supported (`minimum`, `maximum`, `multipleOf`) | ✅ | As above |
| Object constraints not supported (`patternProperties`, `unevaluatedProperties`, `propertyNames`, `minProperties`, `maxProperties`) | ✅ | As above |
| Array constraints not supported (`unevaluatedItems`, `contains`, `minContains`, `maxContains`, `minItems`, `maxItems`, `uniqueItems`) | ✅ | As above |
