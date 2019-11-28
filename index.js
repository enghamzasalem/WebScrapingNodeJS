const rp = require("request-promise");
const request = require("request");
const $ = require("cheerio");
const url = "https://io.hsoub.com";
const encoded = encodeURI(url);
console.log(encoded);
const fs = require("fs");
rp(encoded)
  .then(function(html) {
    //success!
    const wikiUrls = [];
    console.log($("a", html).length);
    for (let i = 0; i < $("a", html).length; i++) {
      if ($("a", html)[i].attribs.href) {
        wikiUrls.push(decodeURI(url + $("a", html)[i].attribs.href));
      }
    }
    console.log(wikiUrls);

    let alllinks = {
      urls: wikiUrls
    };

    let data = JSON.stringify(alllinks);
    fs.writeFileSync("hsoub.json", data);
  })
  .catch(function(err) {
    //handle error
  });
