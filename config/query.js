const { pool } = require('./connection');

async function query(sql, values) {
  try {
    const [rows] = await pool.query(sql, values);
    return rows;
  } catch (error) {
    console.log(`Hubo un error: ${error}`);
    throw error;
  }
}

module.exports = query;