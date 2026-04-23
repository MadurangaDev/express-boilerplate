import { z } from "zod";

import { loginRequestSchema } from "@validators";

export type ILoginRequest = z.infer<typeof loginRequestSchema>;
