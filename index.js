console.log('yep')


const fs = require('fs');

let pagesrawdata = fs.readFileSync('pages.json');
let pagesjson = JSON.parse(pagesrawdata);


let template = fs.readFileSync('template.html',  {encoding:'utf8', flag:'r'});
console.log(template)

pagesjson.pages.map(page => {
    console.log(page)

    let pageaddeddata = template;
    Object.keys(page.values).forEach(key => {
        const value = page.values[key];
        if(value.includes('.html')) {
            let html = fs.readFileSync(value,  {encoding:'utf8', flag:'r'});
            pageaddeddata = pageaddeddata.replace(`%${key}%`, html)
        } else {

            pageaddeddata = pageaddeddata.replace(`%${key}%`, value)
        }
    })
        
    fs.writeFile(`${page.filename}.html`, pageaddeddata, (err) => {
        if (err) console.log(err);
        console.log(`${page.filename} Successfully Written to File.`);
    });
});
