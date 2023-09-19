//get users with their basket
const GET_USERS = (page = 1, pageSize = 50, value = "") => {
    const query = `
        SELECT id FROM users
        WHERE username LIKE "%${value}%"
        ORDER BY created DESC
        LIMIT ${(page - 1) * pageSize} , ${pageSize}`;
    return query;
};

//get single user by id or username
const GET_SINGLE_USER = `SELECT * FROM users WHERE username = ? OR id = ?`;

//get single user by id
const GET_SINGLE_USER_BY_ID = `SELECT * FROM users WHERE id = ?`;

//get single user by username
const GET_SINGLE_USER_BY_USERNAME = `SELECT * FROM users WHERE username = ?`;

//get user_password by username
const GET_PASSWORD = `SELECT password FROM users WHERE username = ?`;

//create user
const CREATE_USER = `INSERT INTO users(username,password,isAdmin) VALUES(? , ?, ?)`;

//delete user
const DELETE_USER = `DELETE FROM users WHERE id = ?`;

//get single user with their basket
const GET_USER_BY_USERNAME = `
SELECT 
    u.id,
    u.username,
    u.isAdmin,
    GROUP_CONCAT(DISTINCT i.id) as basket,
    GROUP_CONCAT(DISTINCT o.item_id) as orders
FROM users u
LEFT JOIN basket b
    ON u.id = b.user_id
LEFT JOIN items i
    ON i.id = b.item_id
LEFT JOIN orders o
    ON u.id = o.user_id
WHERE u.username = ?
GROUP BY u.id;`;

//get single user with their basket
const GET_USER_BY_ID = `
SELECT 
    u.id,
    u.username,
    u.isAdmin,
    GROUP_CONCAT(DISTINCT i.id) as basket,
    GROUP_CONCAT(DISTINCT o.item_id) as orders
FROM users u
LEFT JOIN basket b
    ON u.id = b.user_id
LEFT JOIN items i
    ON i.id = b.item_id
LEFT JOIN orders o
    ON u.id = o.user_id
WHERE u.id = ?
GROUP BY u.id;`;

//get count of the totalUsers for pagination
const GET_COUNT_OF_TOTAL_USERS = (value = "") => {
    const query = `
        SELECT COUNT(DISTINCT id) as total FROM users 
        WHERE username LIKE "%${value}%"
        ORDER BY created DESC
    `;
    return query;
};

module.exports = {
    GET_USERS,
    GET_SINGLE_USER,
    GET_SINGLE_USER_BY_ID,
    GET_SINGLE_USER_BY_USERNAME,
    GET_PASSWORD,
    CREATE_USER,
    DELETE_USER,
    GET_USER_BY_ID,
    GET_USER_BY_USERNAME,
    GET_COUNT_OF_TOTAL_USERS,
};
