import type {FormItemRule} from "element-plus";

type validateTypes = "required" | "email" | "password" | "phone" | "username" | "termsConditions";

const validator: Record<validateTypes, FormItemRule> = {
    username: {
        type: "string",
        pattern: /^[a-zA-Z0-9_]{4,20}$/,
        message: "Username must be at least 4 and at most 20 characters long and contain only letters, numbers and underscores",
    },
    required: {
        required: true,
        message: "This field is required",
        trigger: "blur",
    },
    email: {
        type: "email",
        trigger: "blur",
        message: "Please enter a valid email address",
    },
    password: {
        type: "string",
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/g,
        message: "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        trigger: "blur",
    },
    phone: {
        type: "string",
        min: 5,
        max: 16,
        message: "Please enter a valid phone number",
        trigger: "blur",
    }, termsConditions: {
        type: "boolean",
        validator: (rule, value, callback) => {
            if (value) {
                callback();
            } else {
                callback(new Error('Please accept the terms and conditions'));
            }
        },
        required: true,
        trigger: "change"
    },
}

function useValidators() {
    return validator;
}

export {useValidators};