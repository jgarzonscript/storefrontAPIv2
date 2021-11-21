export type apiResponse = {
    success: boolean;
    data?: any;
    error?: Error;
    message?: string;
};

export const createResponse = () => {
    const response: apiResponse = {
        success: false
    };
    return response;
};
