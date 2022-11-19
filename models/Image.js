'use strict';
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {

  class Image extends Model {

    static associate(models) {

    }

  }

  Image.init(
    {
      tipo: DataTypes.STRING(50),
      nombre: DataTypes.STRING(100)
    }, 
    {
      sequelize,
      modelName: 'image',
    })

  return Image
}