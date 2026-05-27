const db = require("../config/db");

// Get Item Types
const getItemTypes = async () => {

    const sql = `
        SELECT * FROM item_types
    `;
    const [result] = await db.query(sql);
    return result;

};


// GET ALL ITEMS
const getAllItems = async () => {

    const sql = `
        SELECT
            items.id,
            items.name,
            items.purchase_date,
            items.stock_available,
            items.item_type_id,
            item_types.type_name
        FROM items
        JOIN item_types
        ON items.item_type_id = item_types.id
    `;

    const [result] = await db.query(sql);
    return result;
};


// CREATE ITEM
const createItem = async (data) => {
    const sql = `
        INSERT INTO items
        (name, purchase_date, stock_available, item_type_id)
        VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(
        sql,
        [
            data.name,
            data.purchase_date,
            data.stock_available,
            data.item_type_id
        ]
    );
    return result;
};


// DELETE ITEM
const deleteItem = async (id) => {
    const sql = `
        DELETE FROM items
        WHERE id = ?
    `;
    const [result] = await db.query(sql, [id]);
    return result;
};


// UPDATE ITEM
const updateItem = async (id, data) => {
    const sql = `
        UPDATE items
        SET
            name = ?,
            purchase_date = ?,
            stock_available = ?,
            item_type_id = ?
        WHERE id = ?
    `;
    const [result] = await db.query(
        sql,
        [
            data.name,
            data.purchase_date,
            data.stock_available,
            data.item_type_id,
            id
        ]
    );
    return result;
};


module.exports = {
    getAllItems,
    createItem,
    deleteItem,
    updateItem,
    getItemTypes
};