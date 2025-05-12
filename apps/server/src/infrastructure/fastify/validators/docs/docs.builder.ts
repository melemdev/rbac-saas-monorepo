import { RouteShorthandOptions } from "fastify";
import { z } from "zod";

export interface DocConfigOptions {
  requestBody?: z.ZodType<any>;
  responseBody?: z.ZodType<any>;
  extraTags?: string[];
  description?: string;
  summary?: string;
  params?: z.ZodType<any>;
  query?: z.ZodType<any>;
  headers?: z.ZodType<any>;
  deprecated?: boolean;
}

export class DocsBuilder {
  constructor(private readonly tagName: string) {}

  config(configOptions?: DocConfigOptions): RouteShorthandOptions {
    const config: RouteShorthandOptions = {
      schema: {
        tags: [this.tagName],
        description: configOptions?.description,
        summary: configOptions?.summary,
        deprecated: configOptions?.deprecated,
      },
    };

    if (configOptions?.requestBody) {
      config.schema!.body = configOptions.requestBody;
    }

    if (configOptions?.responseBody) {
      config.schema!.response = {
        200: {
          description: "Successful response",
          content: {
            "application/json": {
              schema: configOptions.responseBody,
            },
          },
        },
      };
    }

    if (configOptions?.params) {
      config.schema!.params = configOptions.params;
    }

    if (configOptions?.query) {
      config.schema!.querystring = configOptions.query;
    }

    if (configOptions?.headers) {
      config.schema!.headers = configOptions.headers;
    }

    if (configOptions?.extraTags?.length) {
      config.schema!.tags = [...config.schema!.tags!, ...configOptions.extraTags];
    }

    return config;
  }
}
