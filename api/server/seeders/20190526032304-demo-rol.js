'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rols', [{
        nameRol: 'Administrator',  
        createdAt: new Date(),
        updatedAt: new Date()      
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Rols', null, {});
    
  }
};
