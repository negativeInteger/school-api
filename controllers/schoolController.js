const db = require('../config/db');
const { getDistance } = require('../utils/distance');

/**
 * @description Adds a new school to the database after validating input.
 * @param {import('express').Request} req - Express request object containing school data in req.body
 * @param {import('express').Response} res - Express response object used to send back responses
 */
exports.addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Validate input fields
  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({
      message: 'Invalid input. Ensure name, address, latitude, and longitude are provided and valid.'
    });
  }

  try {
    // Insert the new school record into the 'schools' table
    await db.execute(
      'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
      [name, address, latitude, longitude]
    );
    // Respond with success message and 201 Created status
    res.status(201).json({ message: 'School added successfully.' });
  } catch (error) {
    // Handle database errors
    res.status(500).json({ message: 'Database error.', error });
  }
};

/**
 * @description Retrieves all schools from the database, calculates distance from user location, and returns sorted list by proximity.
 * @param {import('express').Request} req - Express request object with latitude and longitude query parameters
 * @param {import('express').Response} res - Express response object used to send back the sorted schools list
 */
exports.listSchools = async (req, res) => {
  // Parse user's latitude and longitude from query parameters
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  // Validate the query parameters
  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ message: 'Invalid coordinates.' });
  }

  try {
    // Fetch all schools from the database
    const [schools] = await db.execute('SELECT * FROM schools');

    // Add distance property to each school object based on user location
    const schoolsWithDistance = schools.map(school => ({
      ...school,
      distance: getDistance(userLat, userLon, school.latitude, school.longitude)
    }));

    // Sort schools ascending by distance (closest first)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    // Return the sorted list
    res.json(schoolsWithDistance);
  } catch (error) {
    // Handle database errors
    res.status(500).json({ message: 'Database error.', error });
  }
};
