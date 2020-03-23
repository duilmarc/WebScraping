const moongose = require("mongoose");
const { MONGO_URI } = require('./config');
const axios = require('axios').default;
const cheerio = require('cheerio');
const con = require("node-cron");
const { BreakingNew} = require("./models");
moongose.connect(MONGO_URI , {useNewUrlParser : true});

con.schedule( "* * * * * *" , async () => {
    console.log("Cron Job executed");
    const html = await axios.get("https://cnnespanol.cnn.com/");
    const $ = cheerio.load(html.data);
    const titles = $(".news__title");

    titles.each((index , element) => {
        const breakingNew = {
            title : $(element)
                    .text()
                    .trim(),
            link  : $(element)
                    .children()
                    .attr("href")
        };
        BreakingNew.create([breakingNew]);

    });
});





