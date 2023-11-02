module.exports = (sequelize, dataTypes) => {
    let alias = "Order";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
            
        },
        user_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
    }
    let config = {
        tableName: "orders",
        timestamps: false
    }
    
    const Order = sequelize.define(alias, cols, config);

    Order.associate = (modelos) => {
        Order.hasMany(modelos.User, {
            as: "users",
            foreignKey: "order_id"
        })
        Order.belongsToMany(modelos.Product, {
            as: "productos",
            through: "product_order",
            foreignKey: "order_id",
            otherKey: "product_id",
            timestamps: false
        })
    }

    return Order;
}