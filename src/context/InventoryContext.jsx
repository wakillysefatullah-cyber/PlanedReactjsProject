// import { createContext, useContext, useState } from "react";

// const InventoryContext = createContext();

// export function InventoryProvider({ children }) {

//   const [stock, setStock] = useState([]);

//   function addStock(product, quantity, purchasePrice) {

//     setStock(prevStock => {

//       const existingProduct = prevStock.find(
//         item => item.productId === product.id
//       );

//       if (existingProduct) {

//         return prevStock.map(item =>
//           item.productId === product.id
//             ? {
//                 ...item,
//                 quantity: item.quantity + quantity,
//                 purchasePrice
//               }
//             : item
//         );

//       }

//       return [
//         ...prevStock,
//         {
//           productId: product.id,
//           productName: product.name,
//           quantity,
//           purchasePrice
//         }
//       ];
//     });
//   }

//   return (
//     <InventoryContext.Provider
//       value={{
//         stock,
//         addStock
//       }}
//     >
//       {children}
//     </InventoryContext.Provider>
//   );
// }

// export function useInventory() {
//   return useContext(InventoryContext);
// }




import { createContext, useContext, useEffect, useState } from "react";

const InventoryContext = createContext();

export function InventoryProvider({ children }) {

    // Load stock from localStorage when application starts
    const [stock, setStock] = useState(() => {
        const savedStock = localStorage.getItem("easycount-stock");

        return savedStock ? JSON.parse(savedStock) : [];
    });


    // Save stock whenever it changes
    useEffect(() => {
        localStorage.setItem("easycount-stock",JSON.stringify(stock));
    }, [stock]);


    // Add purchased quantity to stock
    function addStock(productName, quantity, purchasePrice, company) {

        setStock((currentStock) => {

            const existingProduct = currentStock.find(
                item =>item.productName.toLowerCase() === productName.toLowerCase());

            // Product already exists
            if (existingProduct) {

                return currentStock.map(item => {

                    if (
                        item.productName.toLowerCase() === productName.toLowerCase()
                    ) {

                        return {
                            ...item, quantity:item.quantity + quantity, purchasePrice,company
                        };
                    }
                    return item;
                });
            }


            // New product
            return [
                ...currentStock, {
                    id: Date.now(),
                    productName,
                    quantity,
                    purchasePrice,
                    company
                }
            ];
        });
    }


    // Remove stock
    function removeStock(productName, quantity) {

        setStock((currentStock) => {

            return currentStock.map(item => {
                    if (item.productName.toLowerCase() === productName.toLowerCase()
                    ) {
                        return {
                            ...item,
                            quantity:item.quantity - quantity
                        };
                    }
                    return item;
                })
                .filter(item => item.quantity > 0);
        });
    }


    // Clear all stock
    function clearStock() {
        setStock([]);
    }


    return (
        <InventoryContext.Provider
            value={{stock,addStock,removeStock,clearStock}}
            >
            {children}
        </InventoryContext.Provider>
    );
}


export function useInventory() {
    return useContext(InventoryContext);
}