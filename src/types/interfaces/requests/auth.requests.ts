import { z } from "zod";

import { loginRequestSchema } from "@schemas";

export type ILoginRequest = z.infer<typeof loginRequestSchema>;
