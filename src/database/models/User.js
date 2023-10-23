module.exports = (sequelize, dataTypes) => {
    let alias = "Users"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: dataTypes.STRING,
        },
        lastName: {
            type: dataTypes.STRING,
        },
        hasedPassword: {
            type: dataTypes.STRING,
        }
    };
    let config = {
        tableName: "users",
        timestamps: false
    }
    
    const User = sequelize.define(alias, cols, config);

    return User;
}