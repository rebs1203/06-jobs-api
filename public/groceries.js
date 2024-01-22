import {
    inputEnabled,
    setDiv,
    message,
    setToken,
    token,
    enableInput,
  } from "./index.js";
  import { showLoginRegister } from "./loginRegister.js";
  import { showAddEdit } from "./addEdit.js";
  import { handleDelete } from "./delete.js";
  
  let groceriesDiv = null;
  let groceriesTable = null;
  let groceriesTableHeader = null;
  
  export const handleProducts = () => {
    groceriesDiv = document.getElementById("groceries");
    const logoff = document.getElementById("logoff");
    const addProduct = document.getElementById("add-product");
    groceriesTable = document.getElementById("groceries-table");
    groceriesTableHeader = document.getElementById("groceries-table-header");
  
    groceriesDiv.addEventListener("click", (e) => {
      if (inputEnabled && e.target.nodeName === "BUTTON") {
        if (e.target === addProduct) {
          showAddEdit(null);
        } else if (e.target === logoff) {
            setToken(null);
    
            message.textContent = "You have been logged off.";
    
            groceriesTable.replaceChildren([groceriesTableHeader]);
    
            showLoginRegister();
        } else if (e.target.classList.contains("editButton")) {
            message.textContent = "";
            showAddEdit(e.target.dataset.id);
        } else if (e.target.classList.contains("deleteButton")) {
            message.textContent = ""; 
            handleDelete(e.target.dataset.id); 
            }
      }
    });
  };
  
  export const showGroceries = async () => {
    try {
      enableInput(false);
  
      const response = await fetch("/api/v1/groceries", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      let children = [groceriesTableHeader];
  
      if (response.status === 200) {
        if (data.count === 0) {
          groceriesTable.replaceChildren(...children); // clear this for safety
        } else {
          for (let i = 0; i < data.products.length; i++) {
            let rowEntry = document.createElement("tr");
  
            let editButton = `<td><button type="button" class="editButton" data-id=${data.products[i]._id}>edit</button></td>`;
            let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.products[i]._id}>delete</button></td>`;
            let rowHTML = `
              <td>${data.products[i].name}</td>
              <td>${data.products[i].status}</td>
              <td>${data.products[i].createdBy}</td>
              <div>${editButton}${deleteButton}</div>`;
  
            rowEntry.innerHTML = rowHTML;
            children.push(rowEntry);
          }
          groceriesTable.replaceChildren(...children);
        }
      } else {
        message.textContent = data.msg;
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communication error occurred.";
    }
    enableInput(true);
    setDiv(groceriesDiv);
  };