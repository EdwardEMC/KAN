module.exports = function(sequelize, DataTypes) {
  const Comment = sequelize.define("Comment", {
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // Probably not needed, will have to check if the double belongsTo works first
    // ,
    // userName: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // }
  },
  {
    freezeTableName: true
  });

  // Comment.associate = function(models) {
  //   Comment.belongsTo(models.Topic, {
  //     foreignKey: {
  //       allowNull: false
  //     },
  //     onDelete: "cascade"
  //   });
  // };

  // Comment.associate = function(models) {
  //   Comment.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false
  //     },
  //     onDelete: "cascade"
  //   });
  // };

  return Comment;
};