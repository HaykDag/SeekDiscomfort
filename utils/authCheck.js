const {pool} = require('../Database/database')

const authCheck = async (username)=>{
    const [row] = await pool.query(`
        SELECT isAdmin FROM users WHERE username = ?
        `,[username]);

    return row[0]?.isAdmin;
}

module.exports = authCheck;