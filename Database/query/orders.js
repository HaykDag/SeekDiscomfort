//get all orders in desc order
const GET_ORDERS = ({value="",page=1,pageSize=50}) => {
    const query = `
    SELECT 
	    o.id,
        o.user_id,
        u.username,
        o.item_id,
        i.title,
        i.description,
        i.price,
        o.order_status,
        o.payment_status,
        o.created
    FROM orders AS o
    JOIN users AS u
	    ON u.id = o.user_id
    JOIN items AS i
	    ON i.id = o.item_id
    WHERE (i.title LIKE "%${value}%" OR i.description LIKE "%${value}%" 
            OR o.id LIKE "%${value}%" OR u.username LIKE "%${value}%")
    ORDER BY o.created DESC
    LIMIT ${(page - 1) * pageSize} , ${pageSize}`;
    return query;
};

//get count of the total orders for pagination
const GET_COUNT_OF_TOTAL_ORDERS = (value = "") => {
    const query = `
        SELECT COUNT(DISTINCT o.id) as total FROM orders AS o
        LEFT JOIN users AS u
            ON u.id = o.user_id
        LEFT JOIN items AS i
            ON i.id = o.item_id
        WHERE (i.title LIKE "%${value}%" OR i.description LIKE "%${value}%" 
            OR o.id LIKE "%${value}%" OR u.username LIKE "%${value}%")
    `;
    return query;
};

const GET_ORDER_BY_ID = (id) => {
    const query = `
        SELECT 
            o.id,
            o.user_id,
            u.username,
            o.item_id,
            i.title,
            i.description,
            i.price,
            o.order_status,
            o.payment_status,
            GROUP_CONCAT(DISTINCT img.image_url) as images, 
            o.created
        FROM orders AS o
        JOIN users AS u
            ON u.id = o.user_id
        JOIN items AS i
            ON i.id = o.item_id
        LEFT JOIN images img
            ON img.item_id = i.id
        WHERE o.id = ${id}
        GROUP BY i.id
        `;
    return query;
};

const GET_ORDERS_BY_USER_ID = (id) => {
    const query = `
        SELECT 
        o.id,
        o.user_id,
        u.username,
        o.item_id,
        i.title,
        i.description,
        i.price,
        o.order_status,
        o.payment_status,
        o.created
    FROM orders AS o
    JOIN users AS u
        ON u.id = o.user_id
    JOIN items AS i
        ON i.id = o.item_id
    WHERE o.user_id = ${id}
    `;
    return query;
};

const GET_ORDERS_BY_ITEM_ID = (id) => {
    const query = `
        SELECT 
        o.id,
        o.user_id,
        u.username,
        o.item_id,
        i.title,
        i.description,
        i.price,
        o.order_status,
        o.payment_status,
        o.created
    FROM orders AS o
    JOIN users AS u
        ON u.id = o.user_id
    JOIN items AS i
        ON i.id = o.item_id
    WHERE o.item_id = ${id}
    `;
    return query;
};

const ADD_ORDER = () => {
    const query = `
        INSERT INTO orders(user_id,item_id)
        VALUES (?,?)
    `;
    return query;
};

const UPDATE_ORDER = () => {
    const query = `
        UPDATE orders SET
            order_status = ?,
            payment_status = ?
        WHERE id = ?
    `;
    return query;
};

const DELETE_ORDER = () => {
    const query = `DELETE FROM orders WHERE id = ?`;
    return query;
};

module.exports = {
    GET_ORDERS,
    GET_ORDER_BY_ID,
    GET_ORDERS_BY_USER_ID,
    GET_ORDERS_BY_ITEM_ID,
    ADD_ORDER,
    UPDATE_ORDER,
    DELETE_ORDER,
    GET_COUNT_OF_TOTAL_ORDERS
};
