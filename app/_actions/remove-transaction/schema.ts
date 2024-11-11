import { z } from "zod";

export const removeTransactionSchema = z.object({
  id: z.string(),
});
