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
    let config = {
        tableName: "orders",
        timestamps: false
    }
    
    const Order = sequelize.define(alias, cols, config);


    return Order;
}