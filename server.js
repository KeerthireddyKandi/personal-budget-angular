const express= require('express');
const app= express();
const port= 3000;

app.use('/', express.static('public'));

app.get('/hello', (req, res) => {
    res.send('Hello World from Express!');
  });
  
 app.get('/budget' , (req, res) => {
     const file= require('fs');
     const dataobj=file.readFileSync('new.json');
     const BUDGET=JSON.parse(dataobj);
    res.json(BUDGET);
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
