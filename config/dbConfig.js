module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "crud_api",/*dbname*/
    dialect: "mysql",/**variation. hamile kun use garna lako */
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};