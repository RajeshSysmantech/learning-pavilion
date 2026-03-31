import { ZodSchema } from "zod";

export async function parseBody<T>(request: Request, schema: ZodSchema<T>) {
  const body = await request.json();
  return schema.parse(body);
}
