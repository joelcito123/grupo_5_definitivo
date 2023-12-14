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
        product_id: {
            type: dataTypes.INTEGER,
            allowNull: false
        }
    }
    let config = {
        tableName: "orders",
        timestamps: false
    }
    
    const Order = sequelize.define(alias, cols, config);

    Order.associate = (modelos) => {
        Order.belongsTo(modelos.User, {
            as: "usuarios",
            foreignKey: "user_id"
        })
        Order.belongsTo(modelos.Product, {
            as: "productos",
            foreignKey: "product_id",
        })
    }

    return Order;
}