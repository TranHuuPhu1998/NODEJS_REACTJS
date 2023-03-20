module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    return db.collection('categories').updateMany({}, {$set: {updatedAt: '1123', createdAt: '123123'}})
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    return db.collection('categories').updateMany({}, { $rename: { categoryName: "categoryName" } })
  }
};
