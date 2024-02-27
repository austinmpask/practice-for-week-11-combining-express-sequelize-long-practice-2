"use strict";

const { Insect, Tree } = require("../models");

const data = [
  {
    insect: { name: "Western Pygmy Blue Butterfly" },
    trees: [
      { tree: "General Sherman" },
      { tree: "General Grant" },
      { tree: "Lincoln" },
      { tree: "Stagg" },
    ],
  },
  {
    insect: { name: "Patu Digua Spider" },
    trees: [{ tree: "Stagg" }],
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 0; i < data.length; i++) {
      const insect = await Insect.findOne({
        where: {
          name: data[i].insect.name,
        },
      });

      for (let j = 0; j < data[i].trees.length; j++) {
        const treeName = data[i].trees[j].tree;
        const tree = await Tree.findOne({
          where: {
            tree: treeName,
          },
        });

        await tree.addInsect(insect);
      }
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    for (let i = 0; i < data.length; i++) {
      const insect = await Insect.findOne({
        where: {
          name: data[i].insect.name,
        },
      });

      for (let j = 0; j < data[i].trees.length; j++) {
        const treeName = data[i].trees[j].tree;
        const tree = await Tree.findOne({
          where: {
            tree: treeName,
          },
        });

        await tree.removeInsect(insect);
      }
    }
  },
};
