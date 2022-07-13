process.on('message', function (fromFather) {
    let info = {
        entryArg: fromFather.port,
        execPath: process.execPath,
        os: process.platform,
        idProcess: process.pid,
        nodeVersion: process.version,
        directorio: process.cwd(),
        memory: process.memoryUsage(),
        numCPUs: fromFather.nucleos
    };
    console.log(`Child PID ${process.pid}`)
    process.send(info);
});