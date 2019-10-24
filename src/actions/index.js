import axios from "axios";

export const FETCH_EVENTS = "fetch_events";

export function fetchEvents() {
  const request = axios.get(
    `https://api.meetup.com/find/upcoming_events?key=597535717d26481d695a15d7f2e753f&sign=true&page=100`
  );

  return {
    type: FETCH_EVENTS,
    payload: request
  };
}
