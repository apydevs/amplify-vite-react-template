// validation.ts
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * Handles GraphQL errors and returns a user-friendly error message.
 *
 * @returns {string} - The user-friendly error message to display.
 * @param value
 * @param name
 */
export const handleValidateRequired = (value: string | number, name: string): object | boolean => {
    // Use toast notification for validation error
    if (!value) {
        toast.warning(` ${name} field is required!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });

        return {
            type: 'validation',
            message: name,
            error: `${name} field is required`,
        };
    }

    return false;
};

export const handleValidateBackend = (value: string | number, name: string): object | boolean => {
    // Use toast notification for validation error
        toast.warning(` ${value} `, {
            position: "top-right",
            autoClose: 10000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });

        return {
            type: 'validation',
            message: name,
            error: `${value}`,
        };
};


export const handleSuccessNotify = (value: string | number, name: string): object | boolean => {
    // Use toast notification for validation error
    toast.success(` ${value} `, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

    return {
        type: 'validation',
        message: name,
        error: `${value}`,
    };
};


// Wrapper function to validate multiple fields at once
export const validateMultipleFields = (fields: { value: string | number; name: string }[]): boolean => {
    let isValid = true;

    fields.forEach((field) => {
        const validationResult = handleValidateRequired(field.value, field.name);
        if (validationResult) {
            isValid = false; // Mark form as invalid if any validation fails
        }
    });

    return isValid;
};




// Wrapper function to validate multiple fields at once
export const validateMultipleGQLValidation = (fields: { value: string | number; name: string }[]): boolean => {

    fields.forEach((field) => {
        handleValidateBackend(field.value, field.name);
    });
    return true
};



export const goodUserNotification =  (fields: { value: string | number; name: string }[]): boolean => {

    fields.forEach((field) => {
        handleSuccessNotify(field.value, field.name);
    });


    return true
};
