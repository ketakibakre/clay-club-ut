/**
 * Clay Club @ UT — signup endpoint.
 *
 * Receives POSTs from the form in index.html and appends one row per signup.
 * This file is version-controlled here for reference; it runs in Google Apps
 * Script, not on the site. Paste it into the script editor bound to the sheet.
 *
 * Setup is in apps-script/README.md.
 */

// The spreadsheet this writes to.
const SPREADSHEET_ID = '12bw5PJvIwBRZeey6hlBN-qCsydGbzh1Rl4NNWH4fS7o';

// Tab to append to. Created automatically if it does not exist.
// If you want the rows in an existing tab, change this to that tab's exact name.
const SHEET_NAME = 'Signups';

// Column order is load-bearing: it matches the comment above SCRIPT_URL in
// index.html. Add new fields at the END so existing rows stay aligned.
const COLUMNS = [
  'timestamp',
  'name',
  'email',
  'ut_eid',
  'major',
  'year',
  'availability_days',
  'goal',
  'utm_source',
  'comments'
];

function doPost(e) {
  // Two people submitting at the same moment can otherwise land on the same
  // row and one gets lost — likely during a recruiting push.
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const sheet = getSheet_();
    const p = (e && e.parameter) ? e.parameter : {};

    sheet.appendRow([
      new Date(),
      p.name || '',
      p.email || '',
      p.ut_eid || '',
      p.major || '',
      p.year || '',
      p.availability_days || '',
      p.goal || '',
      p.utm_source || 'direct',
      p.comments || ''
    ]);

    return json_({ ok: true });
  } catch (err) {
    // The site posts with mode:'no-cors' and cannot read this response, so the
    // log is the only place a failure shows up. Executions tab in Apps Script.
    console.error(err);
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Visiting the /exec URL in a browser should say this. Handy sanity check. */
function doGet() {
  return ContentService.createTextOutput(
    'Clay Club signup endpoint is live. Submissions are POSTed here.'
  );
}

function getSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Run this once from the editor (Run > testAppend) to confirm the script can
 * write to the sheet before wiring up the site. It adds one obvious test row.
 */
function testAppend() {
  doPost({
    parameter: {
      name: 'Test Row — delete me',
      email: 'test@utexas.edu',
      ut_eid: 'test123',
      major: 'MIS',
      year: 'Sophomore',
      availability_days: 'Monday, Wednesday',
      goal: 'Learn GTM, Land an internship',
      utm_source: 'manual-test',
      comments: 'Free-text feedback lands here.'
    }
  });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
