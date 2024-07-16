const sendErrorResponse = (res, statusCode, message) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        success: false,
        message: message,
    }));
};

export default sendErrorResponse;