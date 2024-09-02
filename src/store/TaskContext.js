import {createContext} from "react";

export const TaskContext = createContext({
    items: [],
    updateItems: () => {
    },
    addItem: () => {
    },
    deleteItem: () => {
    }
})