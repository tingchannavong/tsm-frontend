import z from "zod";
import { PeopleCountScm } from "./base.schema";

export const createSessionSchema = z.object({
  people: PeopleCountScm
});

// export const GetSessionsSchema = z.object({
//   query: z.object({
//     locationId: LocationIdScm.or(z.literal('all')).optional(),
//     groupId: NullGroupIdScm.optional(),
//     status: z.nativeEnum(SessionStatus).or(z.literal('all')).optional(),
//     page: z.coerce.number().min(1).max(100).default(1),
//     limit: z.coerce.number().max(50).default(20),
//     startDate: dateScm.optional(),
//     endDate: dateScm.optional(),
//   }).refine((data) => {
//     if (!data.startDate && !data.endDate) return;
//     data.endDate >= data.startDate;
//   }, {
//     message: "End date must be after the start date",
//     path: ["endDate"],
//   })
// });