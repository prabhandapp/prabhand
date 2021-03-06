const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Access Config Fils
dotenv.config({ path: './config.env' });

const dbString = process.env.DBSTRING.replace(
  '<PASSWORD>',
  process.env.DB_PASSWORD
);

const dbConnect = async function () {
  try {
    await mongoose.connect(dbString);
    console.log('DB Connected');

    console.log('Listening to port');
  } catch (err) {
    console.error(err);
  }
};

dbConnect();

const app = require('./app');

app.get('/', (req, res) => {
  res.send('Hello World Vickey');
});
const port = process.env.PORT || 3000;
const server = app.listen(port, (err) => {
  if (err) console.log('Error while listening');
});
