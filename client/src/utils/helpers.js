import axios from "axios";

export async function convertToPHP(amount) {
  try {
    const YOUR_API_KEY = "KUNEX9M6Kwogj/J4y7Ru+A==FZ9J1FNl2AdRV6rw"; // Replace with your actual API key
    const response = await axios.get(
      "https://api.api-ninjas.com/v1/convertcurrency",
      {
        params: {
          want: "PHP",
          have: "USD",
          amount: amount,
        },
        headers: {
          "X-Api-Key": YOUR_API_KEY,
        },
      }
    );

    const result = response.data;

    const newAmountFormatted = new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(result.new_amount);

    console.log(newAmountFormatted);
    return newAmountFormatted;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("shop-shop", 1);
    let db, tx, store;
    request.onupgradeneeded = function (e) {
      const db = request.result;
      db.createObjectStore("products", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" });
      db.createObjectStore("cart", { keyPath: "_id" });
      db.createObjectStore("stores", { keyPath: "_id" });
    };

    request.onerror = function (e) {
      console.log("There was an error");
    };

    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(storeName, "readwrite");
      store = tx.objectStore(storeName);

      db.onerror = function (e) {
        console.log("error", e);
      };

      switch (method) {
        case "put":
          store.put(object);
          resolve(object);
          break;
        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case "delete":
          store.delete(object._id);
          break;
        default:
          console.log("No valid method");
          break;
      }

      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}



