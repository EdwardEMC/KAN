module.exports = function(sequelize, DataTypes) {
  const Comment = sequelize.define("Comment", {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  });

  Comment.associate = function(models) {
    Comment.belongsTo(models.Topic, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
  };

  return Comment;
};