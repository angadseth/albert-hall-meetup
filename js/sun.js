// The light at Albert Hall on the evening of the meetup, worked out from the sun's position
// (low-precision solar formulas, good to about a minute). Nothing here is hard-coded.
(function (root) {
  const RAD = Math.PI / 180;
  const ALBERT_HALL = { lat: 26.9116, lon: 75.8195 };

  // Sun altitude in degrees at a JS Date, for a place.
  function altitude(date, { lat, lon }) {
    const d = date.getTime() / 86400000 + 2440587.5 - 2451545.0;
    const g = (357.529 + 0.98560028 * d) * RAD;
    const q = 280.459 + 0.98564736 * d;
    const L = (q + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * RAD;
    const e = (23.439 - 0.00000036 * d) * RAD;
    const ra = Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L));
    const dec = Math.asin(Math.sin(e) * Math.sin(L));
    const gmst = (18.697374558 + 24.06570982441908 * d) % 24;
    const ha = (gmst * 15 + lon) * RAD - ra;
    const phi = lat * RAD;
    return Math.asin(Math.sin(phi) * Math.sin(dec) + Math.cos(phi) * Math.cos(dec) * Math.cos(ha)) / RAD;
  }

  // First minute after `from` at which the sun sinks below `deg`.
  function crossing(from, deg, place) {
    for (let m = 0; m < 6 * 60; m++) {
      const t = new Date(from.getTime() + m * 60000);
      if (altitude(t, place) < deg) return t;
    }
    return null;
  }

  // The evening of 10 October 2026, from the 3:00 PM meet.
  function evening(place = ALBERT_HALL) {
    const meet = new Date('2026-10-10T15:00:00+05:30');
    return {
      meet,
      golden: crossing(meet, 6, place),     // golden hour: sun below 6°
      sunset: crossing(meet, -0.833, place), // top edge of the sun touches the horizon
      blue: crossing(meet, -4, place),       // blue hour: −4° to −6°
      dusk: crossing(meet, -6, place),       // end of civil twilight
    };
  }

  const api = { altitude, evening, ALBERT_HALL };
  if (typeof module !== 'undefined') module.exports = api;
  else root.Sun = api;
})(this);
