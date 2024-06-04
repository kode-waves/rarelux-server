
module.exports = (sequelize, DataTypes) => {
  
    const User = sequelize.define(
      "users",
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        first_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        profile_photo: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        mobile: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        date_of_birth: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        cover_photo: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        address:{
          type: DataTypes.STRING,
          allowNull: false
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
  