const express = require("express");
const router = express.Router();
const {
    getItems,
    addItem,
    removeItem,
    editItem,
    getTypes
} = require("../controllers/itemController");

// GET ITEM TYPES
router.get("/types/all", getTypes);

// GET ALL ITEMS
router.get("/", getItems);

// CREATE ITEM
router.post("/", addItem);

// DELETE ITEM
router.delete("/:id", removeItem);

// UPDATE ITEM
router.put("/:id", editItem);



module.exports = router;