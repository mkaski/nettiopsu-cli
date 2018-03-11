'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nettiopsu = nettiopsu;
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

/**
 * getCourses
 * Returns array ['code', 'name', 'grade', 'date'] of latest course credits
 * @param {string} user - From where
 * @param {string} password - To where
 */
async function getCourses(user, password) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://nettiopsu.utu.fi/login?destination=/index`, { waitUntil: 'networkidle2' });
  await page.waitForSelector('#idToken1');
  await page.focus('#idToken1');
  await page.type('#idToken1', user);
  await page.focus('#idToken2');
  await page.type('#idToken2', password);
  await page.click('#loginButton_0');
  await page.waitFor(200);
  await page.waitForSelector('#personal_index');
  const content = await page.content();
  const $ = cheerio.load(content);
  const courses = [];
  $('#personal_index .boxed').children().last().find('table tbody tr').each((j, elem) => {
    courses[j] = [];
    $(elem).find('td').each((k, el) => {
      courses[j].push($(el).text());
    });
  });
  await page.close();
  await browser.close();
  return courses;
}

function nettiopsu(u, p) {
  return new Promise(async (resolve, reject) => {
    const data = await getCourses(u, p);
    resolve(data);
  });
}
