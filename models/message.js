module.exports = function(sequelize, DataTypes) {
  const Messages = sequelize.define("Messages", {
  // a combo of both the name of user who clicks chat and the profile clicked on
  // can then string query for the individual name within the mysql database
    message: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true
    }
  },
  {
    freezeTableName: true
  });

  Messages.associate = function(models) {
    Messages.belongsTo(models.Chats, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
    Messages.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
      // onDelete: "cascade" Probably not needed
    });
  };

  return Messages;
};