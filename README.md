# OpenAI Structured Outputs metaschema

[OpenAI Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs) ensure that model outputs conform to a JSON schema provided by the client, but it supports only a [subset](https://platform.openai.com/docs/guides/structured-outputs#supported-schemas) of JSON schemas. This repo offers a metaschema that validates a schema's conformance to many of OpenAI's constraints.

## Usage

> [!IMPORTANT]  
> The metaschema is built on top of the 2019-09 JSON Schema spec. You may need to set up your validator appropriately, for example `import Ajv from "ajv/dist/2019";` rather than `import Ajv from "ajv";`

Depending on your validator of choice, you will probably need to do the following:

* Set your JSON schema's `$schema` to `"https://pdavies.co.uk/openai-structured-outputs-schema/2019-09/schema"`
* Add the `https://pdavies.co.uk/openai-structured-outputs-schema/2019-09/schema`  metaschema to your validator, e.g. `ajv.addMetaSchema(...)`
* Also add `https://pdavies.co.uk/openai-structured-outputs-schema/2019-09/innerSchema` to your validator

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
