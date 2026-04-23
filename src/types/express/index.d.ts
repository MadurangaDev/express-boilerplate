declare namespace Express {
  interface Request {
    validated?: import("@requests").IValidatedRequestData;
  }
}
