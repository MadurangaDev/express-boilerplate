import { z } from "zod";

import { loginResponseSchema } from "@validators";

export type ILoginResponse = z.infer<typeof loginResponseSchema>;
