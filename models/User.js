const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Create the user model
class User extends Model {}

//define table columns and configuration
User.init(
    {
        //id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true

        },
        //username column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        //password column
        password: {
            types: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;