const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');

const PORT = 4000;

app.use(cors());


app.get('/api/quotes', async (req, res) => {
  try {
    const count = req.query.count || 5; 
    parseInt(count)  //chainging it to interger

    // Fetch quotes for multiple times
    const quotes = [];
    for (let i = 0; i < count; i++) {
      const response = await axios.get('https://api.kanye.rest/'); // using axios as it is used to fetch the external api
      console.log(response)
      quotes.push(response.data.quote);
    }

    return res.status(200).json({ status:true, message:"quotes has been fetched", quotes }); // responding the quotes 
  } catch (error) {
    console.error(error);
    res.status(500).json({status:false, error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
