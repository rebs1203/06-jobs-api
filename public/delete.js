import { showGroceries } from "./groceries";

let name = null;
let createdBy = null;
let status = null;
let deleteProduct = null;

export const handleDelete = () => {
    name = document.getElementById("company");
    createdBy = document.getElementById("position");
    status = document.getElementById("status");
    deleteProduct = document.getElementsByClassName("deleteButton");

  
    addEditDiv.addEventListener("click", async (e) => {
      if (inputEnabled && e.target.nodeName === "BUTTON") {
          if (e.target === deleteProduct) {
              enableInput(false);
            
              let method = "DELETE";
              let url = `/api/v1/groceries/:${deleteProduct.dataset.id}`;
            
              try {
                const response = await fetch(url, {
                  method: method,
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    name: "",
                    createdBy: "",
                    status: "",
                  }),
                });
            
                const data = await response.json();
                if (response.status === 200) {
                    message.textContent = "The product was successfully deleted."; 
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