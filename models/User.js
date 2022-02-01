const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//Create the user model
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

//define table columns and configuration
User.init(
    {
        //id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true

        },
        //username column
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        //password column
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        hooks: {
          // set up beforeCreate lifecycle "hook" functionality
          async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
    
          async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
          }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
      }
    );
module.exports = User;