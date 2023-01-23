import minimist from 'minimist';
import os from 'os'

const info = {
    cpus: os.cpus().length,
    arguments: JSON.stringify(minimist(process.argv.slice(2).map((arg, i) => (i, arg)))),
    path: `${process.argv[0]}`,
    so: process.platform,
    processId: process.pid,
    nodeVer: process.version,
    folder: process.cwd(),
    rss: process.memoryUsage().rss,
}

export default info;