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


                            // second practice 

// import { createContext, useContext, useEffect, useState } from "react";

// const InventoryContext = createContext();

// export function InventoryProvider({ children }) {

//     // Load stock from localStorage when application starts
//     const [stock, setStock] = useState(() => {
//         const savedStock = localStorage.getItem("easycount-stock");

//         return savedStock ? JSON.parse(savedStock) : [];
//     });


//     // Save stock whenever it changes
//     useEffect(() => {
//         localStorage.setItem("easycount-stock",JSON.stringify(stock));
//     }, [stock]);


//     // Add purchased quantity to stock
//     function addStock(productName, quantity, purchasePrice, company) {

//         setStock((currentStock) => {

//             const existingProduct = currentStock.find(
//                 item =>item.productName.toLowerCase() === productName.toLowerCase());

//             // Product already exists
//             if (existingProduct) {

//                 return currentStock.map(item => {

//                     if (
//                         item.productName.toLowerCase() === productName.toLowerCase()
//                     ) {

//                         return {
//                             ...item, quantity:item.quantity + quantity, purchasePrice,company
//                         };
//                     }
//                     return item;
//                 });
//             }


//             // New product
//             return [
//                 ...currentStock, {
//                     id: Date.now(),
//                     productName,
//                     quantity,
//                     purchasePrice,
//                     company
//                 }
//             ];
//         });
//     }


//     // Remove stock
//     function removeStock(productName, quantity) {

//         setStock((currentStock) => {

//             return currentStock.map(item => {
//                     if (item.productName.toLowerCase() === productName.toLowerCase()
//                     ) {
//                         return {
//                             ...item,
//                             quantity:item.quantity - quantity
//                         };
//                     }
//                     return item;
//                 })
//                 .filter(item => item.quantity > 0);
//         });
//     }


//     // Clear all stock
//     function clearStock() {
//         setStock([]);
//     }


//     return (
//         <InventoryContext.Provider
//             value={{stock,addStock,removeStock,clearStock}}
//             >
//             {children}
//         </InventoryContext.Provider>
//     );
// }


// export function useInventory() {
//     return useContext(InventoryContext);
// }





                    // third 



import { createContext, useContext, useEffect, useState } from "react";

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
    // Load previously saved stock when the app starts.
    const [stock, setStock] = useState(() => {
        try {
            const savedStock = localStorage.getItem("easycount-stock");
            return savedStock ? JSON.parse(savedStock) : [];
        } catch {
            return [];
        }
    });

    // Save stock whenever its state changes.
    useEffect(() => {
        localStorage.setItem("easycount-stock", JSON.stringify(stock));
    }, [stock]);

    // Add a purchased product or increase an existing product's quantity.
    function addStock(productName, quantity, purchasePrice, company) {
        const name = String(productName).trim();
        const amount = Number(quantity);
        const price = Number(purchasePrice);

        if (!name || !Number.isInteger(amount) || amount <= 0) {
            return false;
        }

        if (!Number.isFinite(price) || price < 0) {
            return false;
        }

        setStock((currentStock) => {
            const existingProduct = currentStock.find(
                (item) =>
                    item.productName.toLowerCase() === name.toLowerCase()
            );

            if (existingProduct) {
                return currentStock.map((item) =>
                    item.productName.toLowerCase() === name.toLowerCase()
                        ? {
                              ...item,
                              quantity: Number(item.quantity) + amount,
                              purchasePrice: price,
                              company,
                          }
                        : item
                );
            }

            return [
                ...currentStock,
                {
                    id: Date.now(),
                    productName: name,
                    quantity: amount,
                    purchasePrice: price,
                    company,
                },
            ];
        });

        return true;
    }

    // Subtract sold quantity only when enough stock is available.
    // function removeStock(productName, quantity) {
    //     const name = String(productName).trim();
    //     const amount = Number(quantity);

    //     if (!name || !Number.isInteger(amount) || amount <= 0) {
    //         return {
    //             success: false,
    //             message: "Quantity must be a positive whole number.",
    //         };
    //     }

    //     const existingProduct = stock.find(
    //         (item) =>
    //             item.productName.toLowerCase() === name.toLowerCase()
    //     );

    //     if (!existingProduct) {
    //         return {
    //             success: false,
    //             message: "This product does not exist in stock.",
    //         };
    //     }

    //     if (Number(existingProduct.quantity) < amount) {
    //         return {
    //             success: false,
    //             message: `Only ${existingProduct.quantity} units are available.`,
    //         };
    //     }

    //     setStock((currentStock) =>
    //         currentStock.map((item) =>
    //             item.productName.toLowerCase() === name.toLowerCase()
    //                 ? {
    //                       ...item,
    //                       quantity: Number(item.quantity) - amount,
    //                   }
    //                 : item
    //         )
    //     );

    //     return { success: true, message: "Stock updated successfully." };
    // }


    function removeStock(productName, quantity) {
    const name = String(productName).trim().toLowerCase();
    const amount = Number(quantity);

    if (!name || !Number.isInteger(amount) || amount <= 0) {
        return {
            success: false,
            message: "Enter a valid product and quantity.",
        };
    }

    const existingProduct = stock.find(
        (item) => item.productName.trim().toLowerCase() === name
    );

    if (!existingProduct) {
        return {
            success: false,
            message: "Product not found in stock.",
        };
    }

    if (Number(existingProduct.quantity) < amount) {
        return {
            success: false,
            message: `Only ${existingProduct.quantity} units are available.`,
        };
    }

    setStock((currentStock) =>
        currentStock.map((item) =>
            item.productName.trim().toLowerCase() === name
                ? {
                      ...item,
                      quantity: Number(item.quantity) - amount,
                  }
                : item
        )
    );

    return {
        success: true,
        message: "Stock updated successfully.",
    };
}



    // Clear all inventory if you explicitly need this feature.
    function clearStock() {
        setStock([]);
    }

    return (
        <InventoryContext.Provider
            value={{ stock, addStock, removeStock, clearStock }}
        >
            {children}
        </InventoryContext.Provider>
    );
}

export function useInventory() {
    const context = useContext(InventoryContext);

    if (!context) {
        throw new Error(
            "useInventory must be used inside InventoryProvider."
        );
    }

    return context;
}
