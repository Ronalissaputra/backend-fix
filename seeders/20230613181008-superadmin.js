module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert("Superadmin", [
      {
        name: "John",
        email: "john@gmail.com",
        password: "john12",
        role: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete("Superadmin", null, {});
  },
};
