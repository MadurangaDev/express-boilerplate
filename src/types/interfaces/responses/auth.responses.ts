import { z } from "zod";

import { loginResponseSchema } from "@schemas";

export type ILoginResponse = z.infer<typeof loginResponseSchema>;
