const mongoose = require('mongoose')

const featuresSchema = mongoose.Schema(
    {
        MessageID: String
    }
);

module.exports = mongoose.model('Features', featuresSchema, 'features')