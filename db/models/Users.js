
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        default: 'unNamed',
        allowNull: true,
      },
      token:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      address:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      provider:{
        type: DataTypes.INTEGER, //1 -> METAMASK
        allowNull: true,
      }
    },
    {
      tableName: "user",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
    }
  );

  return User;
};
