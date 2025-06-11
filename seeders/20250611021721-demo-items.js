"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("items", [
      {
        cronogramaId: 1,
        well: "Well-001",
        network: "Network-A",
        wbs: "WBS-100",
        pad: "Pad-01",
        operacion: "Operacion X",
      },
      {
        cronogramaId: 2,
        well: "Well-002",
        network: "Network-B",
        wbs: "WBS-200",
        pad: "Pad-02",
        operacion: "Operacion Y",
      },
      {
        cronogramaId: 1,
        well: "Well-003",
        network: "Network-C",
        wbs: "WBS-300",
        pad: "Pad-03",
        operacion: "Operacion Z",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("items", null, {});
  },
};
