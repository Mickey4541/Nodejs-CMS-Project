const dbConfig = require("../config/dbConfig.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log("CONNECTED!!");
    })
    .catch((err) => {
        console.log("Error" + err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


//importing model files.
db.blogs = require("./blogModel.js")(sequelize, DataTypes);
db.users = require("./userModel.js")(sequelize, DataTypes);
//yo talako db.reviews vanni line chai reviews vanni table banauna ko lagi. Teska lagi yo code ra model bhitra reviewModel.js vanni file banayera blogModel.js maa vaako code halnu paryo.

// db.reviews = require("./reviewModel.js")(sequelize, DataTypes);


//Relationships>>>>>>>>>>>>>>>>>
db.users.hasMany(db.blogs)
db.blogs.belongsTo(db.users)


db.sequelize.sync({ force: false }).then(() => {
    console.log("yes re-sync done");
});

module.exports = db;