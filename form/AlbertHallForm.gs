/**
 * Albert Hall Museum · Photoshoot Meetup — registration form.
 * Run createAlbertHallForm() ONCE from the vishwakarmaearthworks@gmail.com account.
 * It builds the form, a linked responses sheet with a live "Headcount" tab, and logs every link.
 * Running it again makes a second form, so don't.
 */

const SITE = 'https://angadseth.github.io/albert-hall-meetup/';
const POSTER_URL = SITE + 'assets/img/poster.jpg';
// Optional: an account to add as editor of the form and the sheet. Fill in before running.
const EDITOR = '';

// Question titles double as sheet column headers; the Headcount formulas look them up by name.
const Q = {
  name: 'Full name',
  email: 'Email address',
  phone: 'WhatsApp number',
  roll: 'IIT Madras roll number',
  house: 'Your house',
  city: 'Which city are you coming from?',
  gear: 'What will you shoot with?',
  contest: 'Are you entering the photo contest?',
  insta: 'Instagram handle',
  photos: 'Are you okay appearing in photos the organisers share?',
  note: 'Anything you want to tell us?',
};

const HOUSES = ['Bandipur', 'Corbett', 'Gir', 'Kanha', 'Kaziranga', 'Nallamala', 'Namdapha', 'Nilgiri',
  'Pichavaram', 'Saranda', 'Sundarbans', 'Wayanad'];

function createAlbertHallForm() {
  const form = FormApp.create('📸 Albert Hall Museum · Photoshoot Meetup');

  form.setDescription([
    'Pichavaram House × Iris Society × Nallamala House present',
    'ALBERT HALL MUSEUM · PHOTOSHOOT MEETUP',
    '',
    '🗓  Saturday, 10 October',
    '🕟  4:30 PM onwards',
    '📍  Albert Hall Museum, Ram Niwas Garden, Jaipur',
    '',
    'We meet with time to scout, then shoot through golden hour, sunset and blue hour, when the museum lights up against the sky.',
    '',
    '🏆  The three best photographs win Amazon vouchers: ₹8,000 · ₹5,000 · ₹3,000',
    '',
    'New people, same passion. Bring a camera or just your phone.',
    'Explore · Click · Connect',
    '',
    'Event page: ' + SITE,
  ].join('\n'));

  form.setCollectEmail(false); // email is asked as a normal question below
  form.setAllowResponseEdits(false);
  form.setShowLinkToRespondAgain(false);
  form.setProgressBar(false);

  addImage_(form, POSTER_URL, 'albert-hall-poster.jpg', 'Albert Hall Museum · Photoshoot Meetup');

  form.addSectionHeaderItem()
    .setTitle('About you')
    .setHelpText('So we know who is coming and can reach you on the day.');

  form.addTextItem().setTitle(Q.name).setRequired(true);

  form.addTextItem()
    .setTitle(Q.email)
    .setRequired(true)
    .setValidation(FormApp.createTextValidation()
      .requireTextIsEmail()
      .setHelpText('Please enter a valid email address.')
      .build());

  form.addTextItem()
    .setTitle(Q.phone)
    .setHelpText('Updates for the day come on WhatsApp.')
    .setRequired(true)
    .setValidation(FormApp.createTextValidation()
      .requireTextMatchesPattern('^\\s*(\\+?91[\\s-]?|0)?[6-9][0-9]{4}[\\s-]?[0-9]{5}\\s*$')
      .setHelpText('Please enter a valid 10-digit mobile number.')
      .build());

  form.addTextItem()
    .setTitle(Q.roll)
    .setRequired(true)
    .setValidation(FormApp.createTextValidation()
      .requireTextMatchesPattern('^\\s*[0-9]{2}[A-Za-z]{1,2}[0-9]{5,8}\\s*$')
      .setHelpText('Please enter your IIT Madras roll number.')
      .build());

  form.addListItem()
    .setTitle(Q.house)
    .setChoiceValues(HOUSES.concat(['Other / not sure']))
    .setRequired(true);

  form.addTextItem().setTitle(Q.city).setRequired(true);

  form.addSectionHeaderItem()
    .setTitle('The shoot')
    .setHelpText('Golden hour, sunset, blue hour. Three prizes for the best frames.');

  form.addCheckboxItem()
    .setTitle(Q.gear)
    .setChoiceValues(['Phone', 'DSLR / mirrorless', 'Film camera', 'Just coming to hang out'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle(Q.contest)
    .setHelpText('Prizes: ₹8,000, ₹5,000 and ₹3,000 Amazon vouchers for the three best photographs.')
    .setChoiceValues(["Yes, I'm in", 'No, just here for the meetup'])
    .setRequired(true);

  form.addTextItem()
    .setTitle(Q.insta)
    .setHelpText('Optional. So we can tag you when we post the evening.');

  form.addMultipleChoiceItem()
    .setTitle(Q.photos)
    .setChoiceValues(['Yes', 'No, please keep me out of shared photos'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle(Q.note)
    .setHelpText('Optional. A question, an idea for the shoot, or who you are bringing along.');

  // ---- After submit ------------------------------------------------------------------------
  const shortUrl = form.shortenFormUrl(form.getPublishedUrl());
  form.setConfirmationMessage([
    "You're in. ✅",
    '',
    'See you at Albert Hall Museum, Jaipur.',
    'Saturday, 10 October · 4:30 PM onwards.',
    '',
    'Golden hour times, a shot list and directions are on the event page:',
    '👉 ' + SITE,
    '',
    'Bring a friend who loves a good frame. Share this form:',
    '👉 ' + shortUrl,
    '',
    'Explore · Click · Connect 📸',
  ].join('\n'));

  // ---- Responses sheet + live headcount -----------------------------------------------------
  const ss = SpreadsheetApp.create('Albert Hall Photoshoot Meetup — Registrations');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  buildHeadcountTab_(ss);

  if (EDITOR) [form, ss].forEach(f => {
    try { f.addEditor(EDITOR); } catch (e) { Logger.log('Could not add ' + EDITOR + ' as editor: ' + e); }
  });

  Logger.log('================ DONE ================');
  Logger.log('SHARE THIS LINK:  ' + shortUrl);
  Logger.log('Public form:      ' + form.getPublishedUrl());
  Logger.log('Edit the form:    ' + form.getEditUrl());
  Logger.log('Responses sheet:  ' + ss.getUrl());
}

function addImage_(form, url, name, title) {
  try {
    const blob = UrlFetchApp.fetch(url).getBlob().setName(name);
    form.addImageItem().setTitle(title).setImage(blob).setAlignment(FormApp.Alignment.CENTER).setWidth(740);
  } catch (e) {
    Logger.log('Image could not be added (' + e + '). Add it by hand: Insert image -> By URL -> ' + url);
  }
}

// "Headcount": total registrations, contest entries, and a count per house.
function buildHeadcountTab_(ss) {
  let resp = null;
  for (let i = 0; i < 10 && !resp; i++) {
    SpreadsheetApp.flush();
    resp = SpreadsheetApp.openById(ss.getId()).getSheets().find(s => s.getFormUrl());
    if (!resp) Utilities.sleep(1500);
  }
  const R = "'" + (resp ? resp.getName() : 'Form Responses 1') + "'";
  const col = title => `INDEX(${R}!A:Z,0,MATCH("${title}",${R}!1:1,0))`;
  const count = (title, value) => `=IFERROR(COUNTIF(${col(title)},"${value}"),0)`;
  const has = (title, value) => `=IFERROR(COUNTIF(${col(title)},"*${value}*"),0)`;

  const sh = ss.getSheets().find(s => s.getName() === 'Sheet1') || ss.insertSheet('Headcount');
  sh.setName('Headcount');
  const rows = [
    ['📸 ALBERT HALL MUSEUM · PHOTOSHOOT MEETUP', ''],
    ['Saturday 10 October · 4:30 PM · Jaipur', ''],
    ['', ''],
    ['Registered', `=MAX(0,COUNTA(${R}!A:A)-1)`],
    ['Entering the contest', count(Q.contest, "Yes, I'm in")],
    ['Okay to appear in photos', count(Q.photos, 'Yes')],
    ['', ''],
    ['SHOOTING WITH', ''],
    ['Phone', has(Q.gear, 'Phone')],
    ['DSLR / mirrorless', has(Q.gear, 'DSLR')],
    ['Film camera', has(Q.gear, 'Film')],
    ['', ''],
    ['BY HOUSE', ''],
  ].concat(HOUSES.concat(['Other / not sure']).map(h => [h, count(Q.house, h)]));
  sh.getRange(1, 1, rows.length, 2).setValues(rows);
  sh.getRange('A1').setFontSize(14).setFontWeight('bold').setFontColor('#1B1712');
  sh.getRange('A2').setFontColor('#76674F');
  sh.getRange('A4:B4').setFontSize(13).setFontWeight('bold');
  ['A8', 'A13'].forEach(a => sh.getRange(a).setFontWeight('bold').setFontColor('#A8681F'));
  sh.setColumnWidth(1, 300);
  sh.setColumnWidth(2, 90);
  sh.setFrozenRows(2);
  ss.setActiveSheet(sh);
  ss.moveActiveSheet(1);
}
