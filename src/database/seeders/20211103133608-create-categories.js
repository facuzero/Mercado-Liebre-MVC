'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('Categories', [
        {
        name: 'Hogar',
        createdAt: new Date
       },
       {
        name: 'Informática',
        createdAt: new Date
       },
       {
        name: 'Audio y video',
        createdAt: new Date
       },
       {
        name: 'Celulares',
        createdAt: new Date
       },
    ], {});
  
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
