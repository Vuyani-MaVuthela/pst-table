const express = require("express");
const router = express.Router();
const db = require("../db-config/database");

router.put("/api/psl/:id", async (req, res) => {
  try {
    const query = `
    UPDATE psl
    SET team_name=$2, played=$3, points=$4, goal_d=$5
    WHERE team_id = $1
    RETURNING *;
    `;

    const values = [
      req.params.id,
      req.body.team_name,
      req.body.played,
      req.body.points,
      req.body.goal_d,
    ];

    const { rows } = await db.query(query, values);
    res.json(rows);
  } catch (err) {
    res.status(400).json(err);
    console.error(err.message);
  }
});

module.exports = router;
