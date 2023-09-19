const {
    GET_USER_BY_USERNAME,
    GET_USER_BY_ID,
} = require("../Database/query/users");
const { pool } = require("../Database/database");

const getSingleUser = async ({ username, id }) => {
    let user = null;

    if (username) {
        const [row] = await pool.query(GET_USER_BY_USERNAME, [username]);
        user = row[0];
    } else {
        const [row] = await pool.query(GET_USER_BY_ID, [id]);
        user = row[0];
    }

    if (!user) {
        return undefined;
    } else {
        if (user.basket) {
            const [items] = await pool.query(
                `SELECT id,title, price FROM items WHERE id IN (${user.basket})`
            );
            user.basket = items;
        } else {
            user.basket = [];
        }
        if (!user.orders) {
            user.orders = [];
        } else {
            const [orders] = await pool.query(`
                SELECT 
                    i.id,
                    i.title,
                    i.price,
                    o.order_status,
                    o.id as order_id,
                    o.payment_status 
                FROM items i
                JOIN orders o
                    ON i.id = o.item_id 
                WHERE i.id IN (${user.orders}) AND o.user_id = ${user.id}`);
            user.orders = orders;
        }
    }
    return user;
};

module.exports = getSingleUser;
