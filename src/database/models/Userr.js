module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        
        hashed_password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        profile_image: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
    };
    let config = {
        tableName: 'users',
        timestamps: false,
    }
    const User = sequelize.define(alias, cols, config); 

    User.associate = (models) => {
        User.belongsTo(models.Order, {
            as: "orders",
            foreignKey: "order_id"
        })
    }

    return User
}