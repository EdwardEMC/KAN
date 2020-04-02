// var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    generalInformation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lat: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: true
    },
    lng: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  });

  // User.associate = function(models) {
  //   User.hasMany(models.PoI, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };
  
  // User.associate = function(models) {
  //   User.hasMany(models.Topics, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  // User.associate = function(models) {
  //   User.hasMany(models.Comments, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  // User.associate = function(models) {
  //   User.hasMany(models.Chats, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  // User.prototype.validPassword = function(password) {
  //   return bcrypt.compareSync(password, this.password);
  // };

  // User.addHook("beforeCreate", function(user) {
  //   user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  // });
  
  return User;
};