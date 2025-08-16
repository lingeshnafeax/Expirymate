"use client";
export const fetchEventInfo = async (eventId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_INNGEST_BASE_URL}/v1/events/${eventId}/runs`,
  );
  const json = await response.json();
  return json.data;
};

export async function getRunOutput(eventId: string) {
  const runs = await fetchEventInfo(eventId);
  console.log("Runs", runs);
  return runs;
}


