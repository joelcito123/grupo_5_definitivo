module.exports = (sequelize, dataTypes) => {
    let alias = "Users"
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
        hased_password: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: "users",
        timestamps: false
    }
    
    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.belongsTo(models.Orders, {
            as: "pedidos",
            foreignKey: "order_id"
        })
    }

    return User;
}