const log4js = require('log4js'); //* para almancenar logs

log4js.configure({ //* Configuración de log4js
    appenders: {
        miLoggerConsole: { type: 'console' },
        miLoggerFile: { type: 'file', filename: 'warn.log' },
        miLoggerFile2: { type: 'file', filename: 'error.log' }
    }, 
    categories: {
        default: { appenders: ["miLoggerConsole"], level: "trace" },
        infoCategory: { appenders: ["miLoggerConsole"], level: "info" },
        warningsCategory: { appenders: ["miLoggerFile", "miLoggerConsole"], level: "warn" },
        errorCategory: { appenders: ["miLoggerFile2", "miLoggerConsole"], level: "error" }
    }
})

function showInfo (path, method){
    const logger = log4js.getLogger('infoCategory');
    logger.info(`EndPoint: ${path} Method: ${method}`);
}

function showWarning (path, method){
    const logger = log4js.getLogger('warningsCategory');
    logger.warn(`EndPonit: ${path} Method:${method}`);
}

function showError (errorToShow){
    const logger = log4js.getLogger('errorCategory');
    logger.error(`Error: ${errorToShow}`);
}

module.exports = {
    showInfo,
    showWarning,
    showError
}