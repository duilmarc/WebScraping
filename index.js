
const moongose = require("mongoose");
const { MONGO_URI } = require('./config');
const axios = require('axios').default;
const cheerio = require('cheerio');
const con = require("node-cron");
const { BreakingNew} = require("./models");

//Conexion a la base se datos 
moongose.connect(MONGO_URI , {useNewUrlParser : true});

function validar( breakingNew, termino)
{
    if( breakingNew.title.indexOf(termino) !== 1 )
        console.log(title);
    else
        continue;
}

function parseo( texto , termino){
    var valor = texto.toLowerCase().indexOf(termino.toLowerCase());
    return valor;
}
// Se ejecuta cada segundo * * * * * * - segundo - minuto - hora - dia - mes - dia del mes 
con.schedule( "* * * * * *" , async () => {
    console.log("Cron Job executed");
    const html = await axios.get("https://cnnespanol.cnn.com/");
    const $ = cheerio.load(html.data);
    const titles = $(".news__title");
    var termino = 'Coronavirus';

    titles.each((index , element) => {
        const breakingNew = {
            title : $(element)
                    .text()
                    .trim(),
            link  : $(element)
                    .children()
                    .attr("href")
        };
        if( parseo(breakingNew.title, termino)  !== -1){
            BreakingNew.create([breakingNew]);
        }

    });
});





