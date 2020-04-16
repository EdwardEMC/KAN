module.exports = function(sequelize, DataTypes) {
    const Comment = sequelize.define("Chats", {
    // a combo of both the name of user who clicks chat and the profile clicked on
    // can then string query for the individual name within the mysql database
      chatName: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      user1: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user2: {
        type: DataTypes.STRING,
        allowNull: false
      },
    //   , add later to save messages?
    //   messages: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    //   }
    },
    {
      freezeTableName: true
    });
  
    Comment.associate = function(models) {
      Comment.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        },
        onDelete: "cascade"
      });
    };
  
    return Comment;
  };