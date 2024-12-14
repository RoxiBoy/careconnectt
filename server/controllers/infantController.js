const Infant = require('../database/schemas/infant'); // Ensure the correct path for the Infant model
const Notification = require('../database/schemas/notifications')
const schedule = require('node-schedule')
const { sendSMS } = require('../sms')

const vaccinationStages = [
  { age: 'At Birth', vaccines: ['BCG', 'Hepatitis B (1st)', 'Polio (OPV, 0)'], icon: '👶', color: 'bg-blue-500' },
  { age: '6 Weeks', vaccines: ['DTP', 'IPV', 'Hib', 'Hepatitis B', 'Rotavirus', 'PCV'], icon: '🍼', color: 'bg-green-500' },
  { age: '10 Weeks', vaccines: ['DTP', 'IPV', 'Hib', 'Hepatitis B', 'Rotavirus', 'PCV'], icon: '🍼', color: 'bg-green-500' },
  { age: '14 Weeks', vaccines: ['DTP', 'IPV', 'Hib', 'Hepatitis B', 'Rotavirus', 'PCV'], icon: '🍼', color: 'bg-green-500' },
  { age: '6 Months', vaccines: ['Measles-Rubella (1st)'], icon: '👶', color: 'bg-yellow-500' },
  { age: '12 Months', vaccines: ['Measles-Rubella (2nd)', 'PCV (booster)', 'DTP (booster)'], icon: '🚶‍♂️', color: 'bg-orange-500' },
  { age: '24 Months', vaccines: ['Polio (booster)', 'Typhoid conjugate'], icon: '🧒', color: 'bg-red-500' },
  { age: '60 Months', vaccines: ['DTP (booster)'], icon: '👦', color: 'bg-purple-500' },
  { age: '120 Months', vaccines: ['HPV (for girls)'], icon: '👧', color: 'bg-pink-500' },
  { age: '168 Months', vaccines: ['Tetanus-Diphtheria (booster)'], icon: '🧑', color: 'bg-indigo-500' },
];
// Helper function to calculate notification date based on child's birthdate and age
const calculateVaccinationDate = (birthDate, months) => {
  const date = new Date(birthDate);
  date.setMonth(date.getMonth() + months);
  return date;
};

// Function to generate vaccination notifications
async function generateVaccinationNotifications(birthDate, to) {
  // Birthdate of the child
  const birth = new Date(birthDate);

  // Loop through vaccination stages and create notifications
  for (const stage of vaccinationStages) {
    // Calculate the months for vaccination based on the stage
    const months = parseInt(stage.age.split(' ')[0]) || 0; // Extract months as a number
    const vaccinationDate = calculateVaccinationDate(birth, months);

    // Create a descriptive message
    const vaccinesList = stage.vaccines.join(', ');
    const message = `${stage.icon} ${stage.age}: Vaccines due are ${vaccinesList}. Ensure timely vaccination for your child's health.`;

    // Create and save the notification
    const newNotification = new Notification({
      date: vaccinationDate.toISOString().split('T')[0], // Format date as YYYY-MM-DD
      to: to,
      message: message,
    });
    
    schedule.scheduleJob(newNotification.date, async() => {
      try {
        await sendSMS(newNotification.to, newNotification.message)
      }catch(err) {
        console.log(err)
      }
    })
 
    await newNotification.save(); // Save the notification to the database
  }
}
  // Create a new Infant
exports.createInfant = async (req, res, next) => {
  try {
    const newInfant = new Infant(req.body);
    await newInfant.save();

    generateVaccinationNotifications(newInfant.dateOfBirth, newInfant.phoneNo)
    res.status(201).json({
      success: true,
      message: 'Infant created successfully',
      data: newInfant,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// Get all Infants
exports.getAllInfants = async (req, res, next) => {
  try {
    const infants = await Infant.find();
    res.status(200).json({
      success: true,
      data: infants,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

exports.getChild = async (req, res) => {
  try {
    const infant = await Infant.findById(req.params.id);
    if (!infant) {
      return res.status(404).json({ error: 'Infant not found' });
    }
    res.status(200).json(infant);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an Infant by ID
exports.updateInfant = async (req, res, next) => {
  try {
    const updatedInfant = await Infant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedInfant) {
      return res.status(404).json({
        success: false,
        message: 'Infant not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Infant updated successfully',
      data: updatedInfant,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// Delete an Infant by ID
exports.deleteInfant = async (req, res, next) => {
  try {
    const deletedInfant = await Infant.findByIdAndDelete(req.params.id);
    if (!deletedInfant) {
      return res.status(404).json({
        success: false,
        message: 'Infant not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Infant deleted successfully',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
