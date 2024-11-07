const mongoose = require('mongoose');
const schedule = require('node-schedule');
const dotenv = require('dotenv');
const scheduleCollectionReset = () => {
  mongoose.connect(process.env.MONGO_URL);

  const db = mongoose.connection;

  const rule = new schedule.RecurrenceRule();
  rule.hour = 0;
  rule.minute = 0; 

  schedule.scheduleJob(rule, () => {
    const collectionName = 'tasks';
    db.collection(collectionName).drop()
      .then(() => console.log(`Collection ${collectionName} reset successfully`))
      .catch(err => console.error(`Error resetting collection ${collectionName}:`, err));
  });

  process.on('exit', () => {
    db.close();
  });
};

// Export the function
module.exports = scheduleCollectionReset;
