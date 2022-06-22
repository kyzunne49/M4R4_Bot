const puppeteer = require ('puppeteer');
const fetch = require ('node-fetch');
const cheerio = require ('cheerio');
const fs = require ('fs');


const getFakeData = () => new Promise((resolve, reject) => {
    fetch('https://name-fake.com/id_ID', {
        method: 'GET',
        Headers: {
            'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.128 Safari/537.36 OPR/75.0.3969.250',
        }
    }).then(ress => ress.text())
    .then(result => {
        const $ = cheerio.load(result);
        const getUsername = $('#copy3').text();
        const getEmail = $('#copy4').text();
        const getPassword = $('#copy5').text();
        const objectData = {
            username: getUsername,
            email: getEmail,
            password: getPassword
        }
        resolve(objectData);
    })
});


(async () => {

    
    // xxx diganti code reff kalian

     
    let berulang;
    while (!berulang) {
    
    const getData = await getFakeData();
    const emailnya = getData.email;
    const options = { waitUntil: 'networkidle2'}
     const browser = await puppeteer.launch({headless: false});
     const page = await browser.newPage();
     await page.goto('https://mara.xyz/me/xxx', options);

     await page.waitForTimeout(500);

     console.log('Input Email');
     const fieldEmail = await page.$('#user_email');
     await fieldEmail.type(getData.email);
     fieldEmail.dispose();
    
     const data = fs.appendFileSync ('dataakun.txt', `'${emailnya}'`);

     console.log('Success');

      await page.screenshot({path: 'example.png'});
      await browser.close();
    }

})();