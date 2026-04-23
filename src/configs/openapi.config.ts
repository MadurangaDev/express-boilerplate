import { OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";
import { registry } from "@openAPIRegistry";
import { registerAuthSchemas } from "@validators";

// Import validators here so registerPath() calls execute AFTER registry exists
registerAuthSchemas();

export const generateOpenAPISpec = (): ReturnType<OpenApiGeneratorV3["generateDocument"]> => {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Express Boilerplate API",
      version: "1.0.0",
      description: "Minimal reusable Express + TypeScript boilerplate scaffold.",
    },
    servers: [{ url: "/" }],
  });
};
