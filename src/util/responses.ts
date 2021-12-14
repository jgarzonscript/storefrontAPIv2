export type apiResponse = {
    success: boolean;
    data?: any;
    error?: Error;
    message?: string;
    stackTrace?: string;
};

export const createResponse = () => {
    const response: apiResponse = {
        success: false
    };
    return response;
};
