import { InngestEvents } from "@/types/types";
import { EventSchemas, Inngest } from "inngest";

export const inngest = new Inngest({
  id: "expirymate",
  schemas: new EventSchemas().fromRecord<InngestEvents>(),
});
