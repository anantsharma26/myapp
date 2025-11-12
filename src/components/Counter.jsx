import React from 'react'
import { useState } from "react"; 


const Counter = () => {


    const [count, setCount] = useState(0);

    const increment = () => setCount((prev) => prev + 1);
    const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));
    const reset = () => setCount(0);



    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                gap: "1rem",
            }}
        >
            <h1>Counter App</h1>
            <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={decrement}>-</button>
                <h2>{count}</h2>
                <button onClick={increment}>+</button>
            </div>
            <button onClick={reset}>Reset</button>
        </div>
    )
}

export default Counter