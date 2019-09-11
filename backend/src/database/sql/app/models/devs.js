module.exports = (sequelize, DataTypes) => {
    const devs = sequelize.define('devs', {
      _id:  {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement: true,
            },
      name:  DataTypes.STRING,
      user: DataTypes.STRING,
      bio: DataTypes.STRING,
      avatar: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });

  return devs;
}