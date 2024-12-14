const User = require('../database/schemas/user'); // Import your User model

// Register a new user
exports.createUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

    
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or phone is already in use' });
    }

    // Create and save the new user
    const newUser = new User({ name, email, phone, password });
    await newUser.save();

    console.log('New user created')
    res.status(201).json({ message: 'User created successfully', user: { email: newUser.email, phone: newUser.phone } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong, please try again later.' });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the password
    const isMatch = user.password === password ? true: false;
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user: { email: user.email, phone: user.phone } });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong, please try again later.' });
  }
};

exports.getUserByEmail = async (req, res) => {
  const email = req.query.email; // Access email from query parameter
  console.log(email)
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json(existingUser);
    }
    return res.status(404).json({ message: "User not found" , email: email}); // Use 404 for not found
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong, please try again later." });
  }
};


exports.addMother = async (req, res) => {
  const { email, motherId } = req.body;

  try {
    // Step 1: Check if the user exists
    const existingUser = await User.findOne({ email });
    
    if (!existingUser) {
      console.log("User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Step 2: Update the user's mothers array with the given motherId
    const updatedUser = await User.findByIdAndUpdate(
      existingUser._id, 
      { $addToSet: { mothers: motherId } }, // $addToSet ensures no duplicates in the array
      { new: true } // Return the updated document
    );

    // Step 3: Check if update was successful
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'Failed to update user' });
    }

    // Step 4: Return the success response
    res.status(200).json({
      success: true,
      message: 'Mother ID added successfully',
      data: updatedUser,
    });
    
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the user',
    });
  }
}

exports.addChild = async (req, res) => {
  const { email, childId } = req.body;

  try {
    // Step 1: Check if the user exists
    const existingUser = await User.findOne({ email });
    
    if (!existingUser) {
      console.log("User not found");
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Step 2: Update the user's mothers array with the given motherId
    const updatedUser = await User.findByIdAndUpdate(
      existingUser._id, 
      { $addToSet: { infants: childId} }, // $addToSet ensures no duplicates in the array
      { new: true } // Return the updated document
    );

    // Step 3: Check if update was successful
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'Failed to update user' });
    }

    // Step 4: Return the success response
    res.status(200).json({
      success: true,
      message: 'Child ID added successfully',
      data: updatedUser,
    });
    
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the user',
    });
  }
}
;
