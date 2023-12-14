module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
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
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.DECIMAL,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
    let config = {
        tableName: "products",
        timestamps: false
    }
    
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(modelos) {
        Product.belongsTo(modelos.Category, {
            as: "categories",
            foreignKey: "category_id"
        })
        Product.belongsToMany(modelos.User, {
            as: "usuarios",
            through: "orders",
            foreignKey: "product_id",
            otherKey: "user_id",
            timestamps: false
        })
    }
    
    return Product;

}