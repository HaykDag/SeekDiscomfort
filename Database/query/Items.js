//get items
const GET_ITEMS = `SELECT * FROM items`;

//get items with their categories and images
const GET_SINGLE_ITEM = () => {
    const query = `
        SELECT  
            i.id, 
            i.title, 
            i.description, 
            GROUP_CONCAT( DISTINCT c.title) as tags,
            GROUP_CONCAT(DISTINCT img.image_url) as images, 
            i.price, 
            i.created
        FROM items i
        LEFT JOIN has_category hc
            ON i.id = hc.item_id
        LEFT JOIN categories c
            ON c.id = hc.category_id
        LEFT JOIN images img
            ON img.item_id = i.id
        WHERE i.id = ? OR i.title = ?
        GROUP BY i.id`;
    return query;
};

//update an item
const UPDATE_ITEM = `
UPDATE items SET 
	title = ?,
    description = ?,
    price = ?
WHERE id = ?`;

//get items with their categories
const GET_ITEMS_WITH_CATEGORIES = `
SELECT 
	i.id,
    i.title,
    i.description,
    i.price, 
    GROUP_CONCAT( DISTINCT c.title) as tags 
FROM items as i
JOIN has_category as hc
ON i.id = hc.item_id
JOIN categories as c
ON c.id = hc.category_id
GROUP BY i.id`;

//get count of the totalItems for pagination
const GET_COUNT_OF_TOTAL_ITEMS = (value = "", tag = "") => {
    const query = `
        SELECT COUNT(DISTINCT i.id) as total FROM items i
        LEFT JOIN has_category hc
            ON i.id = hc.item_id
        LEFT JOIN categories c
            ON c.id = hc.category_id
        WHERE (i.title LIKE "%${value}%" OR i.description LIKE "%${value}%") AND c.title LIKE "%${tag}%"
    `;
    return query;
};

//get items with their categories and images
const GET_ITEMS_WITH_CATEGORIES_AND_IMAGES = (
    page = 1,
    pageSize = 50,
    value = "",
    tag = ""
) => {
    const query = `
        SELECT  
            i.id, 
            i.title, 
            i.description, 
            GROUP_CONCAT( DISTINCT c.title) as tags,
            GROUP_CONCAT(DISTINCT img.image_url) as images, 
            i.price, 
            i.created
        FROM items i
        LEFT JOIN has_category hc
            ON i.id = hc.item_id
        LEFT JOIN categories c
            ON c.id = hc.category_id
        LEFT JOIN images img
            ON img.item_id = i.id
        WHERE (i.title LIKE "%${value}%" OR i.description LIKE "%${value}%") AND c.title LIKE "%${tag}%"
        GROUP BY i.id
        ORDER BY i.created DESC
        LIMIT ${(page - 1) * pageSize} , ${pageSize}`;
    return query;
};

module.exports = {
    GET_ITEMS,
    GET_SINGLE_ITEM,
    UPDATE_ITEM,
    GET_ITEMS_WITH_CATEGORIES,
    GET_COUNT_OF_TOTAL_ITEMS,
    GET_ITEMS_WITH_CATEGORIES_AND_IMAGES,
};
