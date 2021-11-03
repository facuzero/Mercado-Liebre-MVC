'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      discount: {
        type: Sequelize.INTEGER,
        defaultValue : 0
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model :{
            tableName : 'Categories'
          },
          key : 'id'
        }
      },
      sectionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model :{
            tableName : 'Sections'
          },
          key : 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};