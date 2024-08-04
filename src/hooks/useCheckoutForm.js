import { useState } from 'react';

const useCheckoutForm = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validate = () => {
        const newErrors = {};
        // Example validation checks
        if (!values.name) newErrors.name = 'Name is required';
        if (!values.phone) newErrors.phone = 'Phone is required';
        // Add more validation as needed

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e, onSubmit) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(values);
        }
    };

    return { values, errors, handleChange, handleSubmit };
};

export default useCheckoutForm;
