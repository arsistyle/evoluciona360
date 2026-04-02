import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import type { LocaleCode } from "./constants/country";
import type { ZodType } from "zod";

const MODULE_SCHEMA = z.array(
  z.object({
    number: z.string(),
    title: z.string(),
    objective: z.string(),
    deliverable: z.string(),
  }),
);

const DIFFERENTIATOR_SCHEMA = z.array(
  z.object({
    icon: z.string(),
    title: z.string(),
    description: z.string(),
  }),
);

const CONTACT_SCHEMA = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string(),
  modalities: z.array(z.string()),
});

const RESULTS_SCHEMA = z.array(z.string());

type AnySchema = ZodType<any>;

const declareCollection = ({
  base,
  schema,
}: {
  base: string;
  schema: AnySchema;
}) => {
  return defineCollection({
    loader: glob({
      pattern: "*.json",
      base,
    }),
    schema,
  });
};

export const collections = {
  modules: declareCollection({
    base: "./src/content/modules",
    schema: MODULE_SCHEMA,
  }),
  differentiators: declareCollection({
    base: "./src/content/differentiators",
    schema: DIFFERENTIATOR_SCHEMA,
  }),
  contact: declareCollection({
    base: "./src/content/contact",
    schema: CONTACT_SCHEMA,
  }),
  results: declareCollection({
    base: "./src/content/results",
    schema: RESULTS_SCHEMA,
  }),
};

export type Locale = LocaleCode;