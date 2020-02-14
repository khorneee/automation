

const puppeteer = require('puppeteer');
var CronJob = require('cron').CronJob;

const settings = {
  user : "",
  password : "",
  crontimeEnter : '0 9 * * 1-5',
  crontimeOut : '0 18 * * 1-5'
}



const enter = async () => {

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250 // slow down by 250ms
  })
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.goto('http://web2/Cop4GoalWeb/Account/Login')
  
  await page.setViewport({ width: 1280, height: 913 })
  
  await page.waitForSelector('table #UserName')
  await page.click('table #UserName')
  await page.keyboard.type(settings.user)

  await page.waitForSelector('table #Password')
  await page.click('table #Password')
  await page.keyboard.type(settings.password)
  
  await page.click('#btnRegistroEntrada')
  
  page.on("dialog", (dialog) => {
    dialog.accept();
    console.log("Ha fichado la entrada correctamente")
  });

  await navigationPromise
  
  await browser.close()

}


const out = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250 // slow down by 250ms
  })
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()
  
  await page.goto('http://web2/Cop4GoalWeb/Account/Login')
  
  await page.setViewport({ width: 1280, height: 913 })
  
  await page.waitForSelector('table #UserName')
  await page.click('table #UserName')
  await page.keyboard.type(settings.user)

  await page.waitForSelector('table #Password')
  await page.click('table #Password')
  await page.keyboard.type(settings.password)
  
  await page.click('#btnRegistroSalida')
  
  page.on("dialog", (dialog) => {
    dialog.accept();
    console.log("Ha fichado la entrada correctamente")
  });

  await navigationPromise
  
  await browser.close()
}


//https://crontab.guru/#0_9_*_*_1-5
var jobEnter = new CronJob(settings.crontimeEnter, async function() {
  console.log('Se procede a la Entrada');
  await enter()
  console.log('Entrada correcta ');
}, null, true, 'Europe/Madrid');


//https://crontab.guru/#0_18_*_*_1-5
var jobOut = new CronJob(settings.crontimeOut, async function() {
  console.log('Se procede a la salida');
  await out()
  console.log('Salida correcta ');
}, null, true, 'Europe/Madrid');

console.log('Acivado fichado de Entrada automático');
jobEnter.start();


console.log('Acivado fichado de Salida automático');
jobOut.start();
