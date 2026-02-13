export const routes = {
  home: () => "/" as const,
  events: () => "/events" as const,
  newEvent: () => "/events/new" as const,
  event: (eventId: string) => `/events/${eventId}` as const,
  availability: (eventId: string) => `/events/${eventId}/availability` as const,
};
