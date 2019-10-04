'use strict';
module.exports = (sequelize, DataTypes) => {
  const Autor = sequelize.define('Autor', {
    nombres: DataTypes.STRING,
    apellidos: DataTypes.STRING,
    cuterId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cuter',
        key: 'id',
        as: 'cuterId'
      }
    },
  }, {});
  Autor.associate = function(models) {
    // associations can be defined here
    Autor.belongsTo(models.Cuter,{
      foreignKey: 'cuterId',
      onDelete: 'CASCADE'
    });

  };
  return Autor;
};