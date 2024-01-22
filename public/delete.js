import { showGroceries } from "./groceries.js";
import {
message,
token,
} from "./index.js";


export const handleDelete = async (productId) => {
let url = `/api/v1/groceries/${productId}`;

          try {
            const response = await fetch(url, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            });
        
            const data = await response.json();
            if (response.status == 200) {
                message.textContent = "The product was successfully deleted."; 
                showGroceries();
            } else {
                message.textContent = data.msg;
            }
          } catch (err) {
            console.log(err);
            message.textContent = "A communication error occurred.";
          }
};