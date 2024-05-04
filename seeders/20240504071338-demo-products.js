/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [
      {
        name: 'Busniess Card',
        price: 28.80,
        description: 'Standard Business Card',
        type: '0',
        image: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Envelope',
        price: 2.04,
        description: 'Standard Enevelope',
        type: '0',
        image: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Card Holder',
        price: 10.99,
        description: 'Promotoional Card Holder',
        type: '1',
        image: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Brouchers',
        price: 18.18,
        description: 'Promotoional Brouchers',
        type: '1',
        image: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Postcards',
        price: 28,
        description: 'Postcards for Mass Marketing',
        type: '1',
        image: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('products', null, {});
  }
};
