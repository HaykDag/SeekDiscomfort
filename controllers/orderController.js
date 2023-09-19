const { pool } = require("../Database/database");
const {
    GET_ORDERS,
    GET_ORDER_BY_ID,
    GET_ORDERS_BY_USER_ID,
    GET_ORDERS_BY_ITEM_ID,
    ADD_ORDER,
    UPDATE_ORDER,
    DELETE_ORDER,
GET_COUNT_OF_TOTAL_ORDERS
} = require("../Database/query/orders");
const authCheck = require("../utils/authCheck");
const createError = require("../utils/error");

//get all orders
const getOrders = async (req, res, next) => {
    const {value,page,pageSize} = req.query;

    const query = GET_COUNT_OF_TOTAL_ORDERS(value);
    const [totalItems] = await pool.query(query);
    const { total } = totalItems[0];

    const sqlQuery = GET_ORDERS({value,page,pageSize});
    try {
        const orders = await pool.query(sqlQuery);
        const result = orders[0];
        res.status(200).json({ result, total });
    } catch (err) {
        next(err);
    }
};
const getOneOrderById = async (req, res, next) => {
    const { id } = req.params;
    const sqlQuery = GET_ORDER_BY_ID(id);
    try {
        const result = await pool.query(sqlQuery);
        const order = result[0];
        res.status(200).json(order);
    } catch (err) {
        next(err);
    }
};

//add a order
const addOrder = async (req, res, next) => {
    const { user_id, item_id } = req.body;
    const sqlQuery = ADD_ORDER();
    try {
        const result = await pool.query(sqlQuery, [user_id, item_id]);
        const id = result[0].insertId;
        res.status(200).json({ id });
    } catch (err) {
        next(err);
    }
};

// //update order
const updateOrder = async (req, res, next) => {
    const { id } = req.params;
    const { order_status, payment_status } = req.body;
    const sqlQuery = UPDATE_ORDER();
    try {
        const result = await pool.query(sqlQuery, [
            order_status,
            payment_status,
            id,
        ]);

        if (!result[0].affectedRows) {
            next(createError(404, "no such order"));
        } else {
            res.status(200).json({ id });
        }
    } catch (err) {
        next(err);
    }
};

// //delete order
const deleteOrder = async (req, res, next) => {
    const { id } = req.params;
    const sqlQuery = DELETE_ORDER();

    const isAdmin = await authCheck(req.username);
    if (!isAdmin) {
        next(createError(401, "You are not authenticated!"));
    } else {
        try {
            await pool.query(sqlQuery, [id]);
            res.status(200).json(`order with id: ${id} is deleted.`);
        } catch (err) {
            next(err);
        }
    }
};

module.exports = {
    getOrders,
    getOneOrderById,
    addOrder,
    updateOrder,
    deleteOrder,
};
