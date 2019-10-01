'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let assetSchema = new Schema({
  id: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  taskType: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  tasktitle: {
    type: String,
    default: '',
    
  },
  startDate: {
    type: Date,
    default: ''
  },
  endDate :{
    type:Date,
    default:""
  },
  link: {
    type: String,
    default: ''
  },
  remarks: {
    type: String,
    default: ''
  }
})


module.exports = mongoose.model('assets', assetSchema);