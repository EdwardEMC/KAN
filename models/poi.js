module.exports = function(sequelize, DataTypes) {
  const PoI = sequelize.define("PoI", {
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
    },
    lat: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: false
    },
    lng: {
      type: DataTypes.DECIMAL(9,6),
      allowNull: false
    }
  },
  {
    freezeTableName: true
  });

  PoI.associate = function(models) {
    PoI.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
  };

  return PoI;
};