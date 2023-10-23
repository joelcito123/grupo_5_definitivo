module.exports = (sequelize, dataTypes) => {
    let alias = "Orders";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
            
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
    }
    
    const Order = sequelize.define(alias, cols, config);

    Order.associate = (models) => {
        Order.hasMany(models.Users, {
            as: "usuarios",
            foreignKey: "order_id"
        })
        Order.belongsToMany(models.Products, {
            as: "productos",
            through: "product_order",
            foreignKey: "order_id",
            otherKey: "product_id",
            timestamps: false
        })
    }

    return Order;
}