const Mother = require('../database/schemas/mother')
const Notification = require('../database/schemas/notifications')
const { sendSMS } = require('../sms')
const schedule = require('node-schedule')

const stageInfo = {
  '1st Trimester': {
    description: 'Your baby is developing rapidly. All major organs and systems are forming.',
    tip: 'Ensure proper folic acid intake and attend your first prenatal visit.',
  },
  '2nd Trimester': {
    description: "You might start feeling the baby move. The baby's features are becoming more defined.",
    tip: 'Consider prenatal exercises and plan your anatomy scan.',
  },
  '3rd Trimester': {
    description: 'Your baby is gaining weight and preparing for birth. You may feel more uncomfortable.',
    tip: 'Prepare your hospital bag and discuss your birth plan with your doctor.',
  },
  'Labour': {
    description: 'Your body is preparing for childbirth. Stay calm and follow your birth plan.',
    tip: 'Monitor contractions and know when to head to the hospital.',
  },
  'Postpartum': {
    description: 'Focus on recovery and bonding with your newborn. Don\'t hesitate to ask for help.',
    tip: 'Rest as much as possible and ensure you have a support system in place.',
  },
};

async function generateNotifications(deliveryDate, to) {
  const delivery = new Date(deliveryDate);

  // Function to calculate the date for each notification
  const getNotificationDate = (daysBefore) => {
    const date = new Date(delivery);
    date.setDate(delivery.getDate() - daysBefore);
    return date;
  };

  // Create notifications for each stage
  const stages = [
    { name: '1st Trimester', daysBefore: 90 },
    { name: '2nd Trimester', daysBefore: 60 },
    { name: '3rd Trimester', daysBefore: 30 },
    { name: 'Labour', daysBefore: 7 },
    { name: 'Postpartum', daysBefore: 0 }
  ];

  // Use for...of loop to handle async/await correctly
  for (const stage of stages) {
    const notificationDate = getNotificationDate(stage.daysBefore);
    const notification = {
      date: notificationDate.toISOString().split('T')[0], // Format the date to YYYY-MM-DD
      to: to,
      message: `${stageInfo[stage.name].description} Tip: ${stageInfo[stage.name].tip}`,
    };

    schedule.scheduleJob(notification.date, async() => {
      try {
        await sendSMS(notification.to, notification.message)
      }catch(err) {
        console.log(err)
      }
    })
    // Create and save the new notification
    const newNotification = new Notification({
      date: notification.date,
      to: notification.to,
      message: notification.message,
    });
    

    await newNotification.save(); // Save to database
  }
}

exports.createMother = async (req, res, next) => {
  try {
    const newMother = new Mother(req.body)
    await newMother.save()
    
    generateNotifications(newMother.deliveryDate, newMother.phoneNo)
    res.status(201).json(newMother)
  }catch(err) {
    res.status(400).json({
      error: err.message
    })
  }
}

// Controller method to get a specific mother by ID
exports.getMother = async (req, res) => {
  try {
    const mother = await Mother.findById(req.params.id);
    if (!mother) {
      return res.status(404).json({ error: 'Mother not found' });
    }
    res.status(200).json(mother);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller method to get all mothers
exports.getAllMothers = async (req, res) => {
  try {
    const mothers = await Mother.find();
    res.status(200).json(mothers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller method to update a mother's information
exports.updateMother = async (req, res) => {
  try {
    const updatedMother = await Mother.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMother) {
      return res.status(404).json({ error: 'Mother not found' });
    }
    res.status(200).json(updatedMother);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller method to delete a mother
exports.deleteMother = async (req, res) => {
  try {
    const deletedMother = await Mother.findByIdAndDelete(req.params.id);
    if (!deletedMother) {
      return res.status(404).json({ error: 'Mother not found' });
    }
    res.status(204).send();  // No content response for successful deletion
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
