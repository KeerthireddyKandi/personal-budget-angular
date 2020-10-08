const express= require('express');
const cors= require('cors');
const app= express();
const port= 3000;

app.use(cors());

/*const budget=
{
  "myBudget": [
      {
          "title": "Eat Out",
          "budget": 30
      },
      {
          "title": "Rent",
          "budget": 100
      },
      {
          "title": "Groceries",
          "budget": 90
      },
    ]
  };
*/
 app.get('/budget' , (req, res) => {
     const file= require('fs');
     const dataobj=file.readFileSync('new.json');
     const BUDGET=JSON.parse(dataobj);
    res.json(BUDGET);
  });

  app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`)
});
