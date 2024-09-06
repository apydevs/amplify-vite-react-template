
// errorHandler.ts

interface GraphQLError {
    message: string;
    extensions?: {
        validation?: Record<string, string[]>;
        category?: string;
    };
}

/**
 * Handles GraphQL errors and returns a user-friendly error message.
 *
 * @param {GraphQLError[]} errors - The array of GraphQL errors returned by the API.
 * @returns {string} - The user-friendly error message to display.
 */
export const handleGraphQLError = (errors: GraphQLError[]): string => {
    if (!errors || errors.length === 0) {
        return 'An unexpected error occurred.';
    }

    // Get the first error in the array (typically, the first is the most relevant)
    const error = errors[0];

    // Check if the error is a validation error
    if (error.message === 'validation' && error.extensions?.validation) {
        // Extract validation error messages and combine them
        return 'Please check your details and try again.';
    }

    // Handle other types of errors, like authentication, server issues, etc.
    switch (error.extensions?.category) {
        case 'authentication':
            return 'Authentication failed. Please check your credentials.';
        case 'authorization':
            return 'You do not have permission to perform this action.';
        default:
            return error.message || 'An unknown error occurred.';
    }
};