import { createContext } from "react";

export const TaskContext = createContext({
    items: [],
    addItem: () => {
    },
    deleteItem: () => {
    }
})