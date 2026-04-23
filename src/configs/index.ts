export * from "./env.js";
// did not export prisma.ts as it causes to evaluate prisma.ts even where it does not need to be evaluated.
// did not export openapi.config.ts and openapi.registry.ts as they caused circular dependency issues with app.ts and auth.validator.ts respectively. They can be imported directly where needed.
