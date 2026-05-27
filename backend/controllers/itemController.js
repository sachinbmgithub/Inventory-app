const itemModel = require("../models/itemModel");


// GET ITEM TYPES
const getTypes = async (req, res) => {
    try {
        const result = await itemModel.getItemTypes();
        res.json(result);

    } catch(error){
        console.log(error);
        res.status(500).json({
            message:"Database Error"
        });

    }

};


// GET ITEMS
const getItems = async (req, res) => {
    try {

        const result = await itemModel.getAllItems();
        res.json(result);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Database Error"
        });
    }
};


// CREATE ITEM
const addItem = async (req, res) => {
    try {
        const {
            name,
            purchase_date,
            item_type_id
        } = req.body;

        // VALIDATION
        if(!name || !purchase_date || !item_type_id){
            return res.status(400).json({
                message: "Required fields missing"
            });

        }
        await itemModel.createItem(req.body);
        res.status(201).json({
            message: "Item Added Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Database Error"
        });
    }
};


// DELETE ITEM
const removeItem = async (req, res) => {
    try {
        const { id } = req.params;
        await itemModel.deleteItem(id);
        res.json({
            message: "Item Deleted"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Database Error"
        });
    }
};


// UPDATE ITEM
const editItem = async (req, res) => {
    try {
        const { id } = req.params;
        await itemModel.updateItem(id, req.body);
        res.json({
            message: "Item Updated"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Database Error"
        });
    }
};

module.exports = {
    getItems,
    addItem,
    removeItem,
    editItem,
    getTypes
};