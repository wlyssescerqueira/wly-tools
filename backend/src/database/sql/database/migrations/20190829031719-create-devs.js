module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('devs', {
      _id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      avatar: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('devs');
  }
};