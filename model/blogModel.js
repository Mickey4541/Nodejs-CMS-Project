module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define("blog", {/*yaha nera define blog xa table name,,,tara database maa blogss banxa kinaki database maa sadhai plural maa hunxa database.*/
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subTitle: {
            type: DataTypes.STRING,
            allowNull : false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull : false
        },
        image : {
            type : DataTypes.STRING
        }
    });
    return Blog;
};