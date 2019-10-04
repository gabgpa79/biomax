'use strict';
module.exports = (sequelize, DataTypes) => {
  const Carrera = sequelize.define('Carrera', {
    name: DataTypes.STRING,
    abreviacion: DataTypes.STRING
  }, {});
  Carrera.associate = function(models) {
    // associations can be defined here
  };
  return Carrera;
};