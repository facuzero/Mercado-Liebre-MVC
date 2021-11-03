'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('Sections', [
        {
        name: 'novedades',
        createdAt: new Date
       },
       {
        name: 'precios cuidados',
        createdAt: new Date
       },
    ], {});
  
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Sections', null, {});
     
  }
};
