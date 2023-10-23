module.exports = (sequelize, dataTypes) => {
    let alias = "Categories";
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

    Category.associate = (models) => {
        Category.hasMany(models.Products, {
            as: "productos",
            foreignKey: "category_id"
        })
    }

    return Category;
}