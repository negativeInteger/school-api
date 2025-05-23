const express = require('express');
const router = express.Router();
const { addSchool, listSchools } = require('../controllers/schoolController');

/**
 * @route POST /addSchool
 * @description Endpoint to add a new school
 * @access Public
 */
router.post('/addSchool', addSchool);

/**
 * @route GET /listSchools
 * @description Endpoint to list schools sorted by proximity to given latitude and longitude query params
 * @access Public
 */
router.get('/listSchools', listSchools);

module.exports = router;
