module.exports = (sequelize, dataTypes) => {
    let alias = "Category";
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
        }
    };
    let config = {
        tableName: "categories",
        timestamps: false
    }
    
    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(modelos) {
        Category.hasMany(modelos.Product, {
            as: "products",
            foreignKey: "category_id"
        })
    }

    return Category;
}
