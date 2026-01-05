import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [activeMainCategory, setActiveMainCategory] = useState('flipsid');

    return (
        <CategoryContext.Provider value={{ activeMainCategory, setActiveMainCategory }}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategory = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('useCategory must be used within a CategoryProvider');
    }
    return context;
};

export default CategoryContext;
