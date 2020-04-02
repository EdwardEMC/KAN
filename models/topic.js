module.exports = function(sequelize, DataTypes) {
  const Topic = sequelize.define("Topic", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  });

  // Topic.associate = function(models) {
  //   Topic.belongsTo(models.User, {
  //     foreignKey: {
  //       allowNull: false
  //     },
  //     onDelete: "cascade"
  //   });
  // };

  // Topic.associate = function(models) {
  //   Topic.hasMany(models.Comment, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  return Topic;
};