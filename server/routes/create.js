const express = require("express");
const router = express.Router();
const db = require("../db-config/database");
const { v4: uuidv4 } = require("uuid");

router.post("/api/psl", async (req, res) => {
  try {
    const query = `
    INSERT INTO psl(team_id,team_name,played,points,goal_d)
    VALUES($1,$2,$3,$4,$5)
    RETURNING *;
    `;

    const values = [
      uuidv4().slice(0, 8),
      req.body.team_name,
      req.body.played,
      req.body.points,
      req.body.goal_d,
    ];

    const { rows } = await db.query(query, values);
    res.status(201).json(values);
  } catch (err) {
    res.status(400).json(err);
    console.error(err.message);
  }
});

module.exports = router;
