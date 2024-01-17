import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showGroceries } from "./groceries.js";

let addEditDiv = null;
let name = null;
let createdBy = null;
let status = null;
let addingProduct = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-groceries");
  name = document.getElementById("name");
  createdBy = document.getElementById("addedby");
  status = document.getElementById("status");
  addingProduct = document.getElementById("adding-product");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
        if (e.target === addingProduct) {
            enableInput(false);
          
            let method = "POST";
            let url = "/api/v1/groceries";
          
            if (addingJob.textContent === "update") {
              method = "PATCH";
              url = `/api/v1/groceries/${addEditDiv.dataset.id}`;
            }
          
            try {
              const response = await fetch(url, {
                method: method,
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  name: name.value,
                  createdBy: createdBy.value,
                  status: status.value,
                }),
              });
          
              const data = await response.json();
              if (response.status === 200 || response.status === 201) {
                if (response.status === 200) {
                  // a 200 is expected for a successful update
                  message.textContent = "The job entry was updated.";
                } else {
                  // a 201 is expected for a successful create
                  message.textContent = "The job entry was created.";
                }
          
                name.value = "";
                createdBy.value = "";
                status.value = "pending";
                showGroceries();
              } else {
                message.textContent = data.msg;
              }
            } catch (err) {
              console.log(err);
              message.textContent = "A communication error occurred.";
            }
            enableInput(true);
          }
    }
  });
};

export const showAddEdit = async (productId) => {
    if (!productId) {
      name.value = "";
      createdBy.value = "";
      status.value = "pending";
      addingProduct.textContent = "add";
      message.textContent = "";
  
      setDiv(addEditDiv);
    } else {
      enableInput(false);
  
      try {
        const response = await fetch(`/api/v1/groceries/${productId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        if (response.status === 200) {
          name.value = data.groceries.name;
          createdBy.value = data.groceries.createdBy;
          status.value = data.groceries.status;
          addingProduct.textContent = "update";
          message.textContent = "";
          addEditDiv.dataset.id = productId;
  
          setDiv(addEditDiv);
        } else {
          // might happen if the list has been updated since last display
          message.textContent = "The groceries entry was not found";
          showGroceries();
        }
      } catch (err) {
        console.log(err);
        message.textContent = "A communications error has occurred.";
        showGroceries();
      }
  
      enableInput(true);
    }
  };