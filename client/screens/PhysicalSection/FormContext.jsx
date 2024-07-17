// FormContext.jsx
import React, { createContext, useState } from 'react';

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        weight: '',
        height: '',
        goal: '',
        condition:'',
        place:'',
    });

    const saveFormData = async () => {
        try {
            const response = await fetch('http://192.168.0.100:3001/formData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log('Success:', data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <FormContext.Provider value={{ formData, setFormData, saveFormData }}>
            {children}
        </FormContext.Provider>
    );
};
