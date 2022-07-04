const express = require("express");
const router = express.Router();
const db = require("../db-config/database");

router.get("/api/psl", async (req, res) => {
  try {
    const query = `
    SELECT * FROM psl
    ORDER BY points desc;
    `;
    const { rows } = await db.query(query);
    res.json({ results: rows.length, rows });
  } catch (err) {
    res.status(400).json(err);
    console.error(err.message);
  }
});

module.exports = router;
