let appConfig = {};

  appConfig.db = {
    uri: 'mongodb://localhost:27017/item_catalog'
    } 

module.exports = {
    db :appConfig.db,
    jwtSecret: 'tasksmanagement'
};
