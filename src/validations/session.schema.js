import z from "zod";
import { PeopleCountScm } from "./base.schema";

export const createSessionSchema = z.object({
  people: PeopleCountScm,
});