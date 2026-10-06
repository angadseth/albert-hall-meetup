# Albert Hall Museum · Photowalk Meetup

The event page for a golden-hour photowalk at **Albert Hall Museum, Jaipur**,
on **Saturday 10 October 2026, 4:30 PM onwards**.

Presented by **Pichavaram House × Iris Society × Nallamala House** (IIT Madras BS Degree).

## What's on the page

- A live countdown to 4:30 PM IST, whatever time zone you open it in.
- The evening's light (golden hour, sunset, blue hour) worked out from the sun's position over
  Albert Hall on 10 October, not typed in by hand.
- How the evening goes: meet at 4:30, walk through golden hour, stay for the lights at blue hour.
- A shot list you can tick off on the day. It is saved on your own phone only.
- The museum's story, directions, and the register button.

## How it's built

Plain HTML, CSS and JavaScript. No framework, no build step, served by GitHub Pages.
The look follows the event poster: old paper, printer's black, one ochre accent.

```
index.html
css/   tokens, paper, one file per section
js/    config (form link lives here), countdown, sun + light, shot list, share
assets/img/
```

To change the registration link, edit `FORM_URL` in `js/config.js`.

Made by **Angad Jangir**.
