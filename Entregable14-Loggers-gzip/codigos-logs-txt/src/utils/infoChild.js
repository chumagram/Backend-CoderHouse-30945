process.on('message', function (fromFather) {
    let info = {
        entryArg: fromFather.port,
        execPath: process.execPath,
        os: process.platform,
        idProcess: process.pid,
        nodeVersion: process.version,
        directorio: process.cwd(),
        memory: process.memoryUsage().rss,
        numCPUs: fromFather.nucleos
    }
    console.log(info)
    process.send(info)
})