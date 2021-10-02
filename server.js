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
  } catch (err) {
    console.error(err);
  }
};

dbConnect();

const app = require('./app');

app.get('/', (req, res) => {
  res.send('Hello World Vickey');
});

const server = app.listen(3000, (err) => {
  if (err) console.log('Error while listening');
  console.log('Listening to port');
});
