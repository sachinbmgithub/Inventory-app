const API_URL = "http://localhost:5000/items";

const itemTypeSelect =
    document.getElementById("itemType");

const itemForm =
    document.getElementById("itemForm");

const tableBody =
    document.getElementById("tableBody");

const messageBox =
    document.getElementById("messageBox");

let editId = null;




// SHOW MESSAGE

const showMessage = (message, type) => {

    messageBox.innerHTML = `
        <div class="message ${type}">
            ${message}
        </div>
    `;

    setTimeout(() => {
        messageBox.innerHTML = "";
    }, 3000);

};


// LOAD ITEM TYPES FROM BACKEND
const loadItemTypes = async () => {

    try {

        const response = await fetch(
            "http://localhost:5000/items/types/all"
        );

        const types = await response.json();

        itemTypeSelect.innerHTML = `
            <option value="">
                Select Type
            </option>
        `;

        types.forEach((type) => {

            itemTypeSelect.innerHTML += `
                <option value="${type.id}">
                    ${type.type_name}
                </option>
            `;

        });

    } catch(error){

        console.log(error);

        showMessage(
            "Failed to load item types",
            "error"
        );

    }

};


// LOAD ITEMS
const loadItems = async () => {

    try {

        const response = await fetch(API_URL);

        const items = await response.json();

        tableBody.innerHTML = "";

        items.forEach((item) => {

            tableBody.innerHTML += `

                <tr>

                    <td>${item.id}</td>

                    <td>${item.name}</td>

                    <td>${item.type_name}</td>

                    <td>
                        ${item.purchase_date.split("T")[0]}
                    </td>

                    <td class="${
                        item.stock_available
                        ? "stock-yes"
                        : "stock-no"
                    }">

                        ${
                            item.stock_available
                            ? "In Stock"
                            : "Out of Stock"
                        }

                    </td>

                    <td>
                        <button
                            class="edit-btn"
                            onclick="editItem(
                                ${item.id},
                                '${item.name}',
                                '${item.purchase_date.split("T")[0]}',
                                ${item.stock_available},
                                ${item.item_type_id}
                            )"
                        >
                            Edit
                        </button>

                        <button
                            class="delete-btn"
                            onclick="deleteItem(${item.id})"
                        >
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {

        console.log(error);

        showMessage(
            "Failed to load items",
            "error"
        );

    }

};



// ADD / UPDATE ITEM
itemForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const itemData = {

        name:
            document.getElementById("name").value,

        item_type_id:
            document.getElementById("itemType").value,

        purchase_date:
            document.getElementById("purchaseDate").value,

        stock_available:
            document.getElementById("stockAvailable").checked

    };



    try {

        if(editId){

            await fetch(`${API_URL}/${editId}`, {

                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body: JSON.stringify(itemData)

            });

            showMessage(
                "Item Updated Successfully",
                "success"
            );

            editId = null;

            document.querySelector(".submit-btn")
                .innerText = "Add Item";

        } else {

            await fetch(API_URL, {

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body: JSON.stringify(itemData)

            });

            showMessage(
                "Item Added Successfully",
                "success"
            );

        }

        itemForm.reset();

        loadItems();

    } catch(error){

        console.log(error);

        showMessage(
            "Something went wrong",
            "error"
        );
    }
});



// DELETE ITEM
const deleteItem = async (id) => {

    const confirmDelete = confirm(
        "Are you sure you want to delete this item?"
    );

    if(!confirmDelete) return;

    try {

        await fetch(`${API_URL}/${id}`, {

            method:"DELETE"

        });

        showMessage(
            "Item Deleted Successfully",
            "success"
        );

        loadItems();

    } catch(error){

        console.log(error);

        showMessage(
            "Delete failed",
            "error"
        );
    }
};



// EDIT ITEM

const editItem = (
    id,
    name,
    purchaseDate,
    stockAvailable,
    itemTypeId
) => {

    document.getElementById("name").value =
        name;

    document.getElementById("purchaseDate").value =
        purchaseDate;

    document.getElementById("stockAvailable").checked =
        stockAvailable;

    document.getElementById("itemType").value =
        itemTypeId;

    editId = id;

    document.querySelector(".submit-btn")
        .innerText = "Update Item";

};


// INITIAL LOAD

loadItemTypes();

loadItems();