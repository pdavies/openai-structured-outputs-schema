import { describe, test, expect } from "vitest";
import Ajv from "ajv/dist/2019";
import * as fs from "fs";
import * as path from "path";

const SCHEMA_URI = "https://example.com/OPENAI/2019-09/schema";

// Helper function to read and parse JSON files
function loadJsonFile(filePath: string) {
  const fullPath = path.join(__dirname, "..", filePath);
  const content = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(content);
}

// Helper function to get all JSON files in a directory
function getJsonFiles(dirPath: string): string[] {
  const fullPath = path.join(__dirname, "..", dirPath);
  return fs
    .readdirSync(fullPath)
    .filter((file) => file.endsWith(".json"))
    .map((file) => path.join(dirPath, file));
}

describe("OpenAI JSON Schema Validation", () => {
  const ajv = new Ajv({ strict: true });

  ajv.addMetaSchema(loadJsonFile("./openai-2019-09/innerSchema"));
  ajv.addMetaSchema(loadJsonFile("./openai-2019-09/schema"));

  // Test valid schemas
  const validSchemas = getJsonFiles("tests/fixtures/valid");
  validSchemas.forEach((schemaPath) => {
    test(`${path.basename(
      schemaPath
    )} should be valid against OpenAI metaschema`, () => {
      const schema = loadJsonFile(schemaPath);
      schema.$schema = SCHEMA_URI;
      const valid = ajv.validateSchema(schema);

      // expect(valid).toBe(true);
      expect(ajv.errors).toBeNull();
    });
  });

  // Test invalid schemas
  const invalidSchemas = getJsonFiles("tests/fixtures/invalid");
  invalidSchemas.forEach((schemaPath) => {
    test(`${path.basename(schemaPath)} should be invalid`, () => {
      const schema = loadJsonFile(schemaPath);
      schema.$schema = SCHEMA_URI;
      const valid = ajv.validateSchema(schema);

      expect(valid).toBe(false);
    });
  });
});
