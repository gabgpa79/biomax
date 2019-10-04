'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cuter = sequelize.define('Cuter', {
    codigo: DataTypes.STRING,
    label: DataTypes.STRING
  }, {});
  Cuter.associate = function(models) {
    // associations can be defined here
  };
  return Cuter;
};