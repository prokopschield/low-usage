"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_utils_1 = require("os-utils");
let wake = () => { };
const waiters = ({
    cpu: [],
    mem: [],
});
(async function () {
    while (true) {
        await new Promise(resolve => {
            if (waiters.cpu.length) {
                os_utils_1.cpuFree((percentage) => {
                    if (percentage > 0.3) {
                        const callback = waiters.cpu.pop();
                        resolve(typeof callback === 'function' && callback());
                    }
                    else
                        setTimeout(resolve, 777);
                });
            }
            else if (waiters.mem.length) {
                if (os_utils_1.freememPercentage() > 0.4) {
                    const callback = waiters.mem.pop();
                    resolve(typeof callback === 'function' && callback());
                }
                else
                    setTimeout(resolve, 777);
            }
            else
                wake = () => resolve(wake = () => { });
        });
    }
})();
class Low_Usage {
    get cpu() {
        return new Promise(resolve => {
            waiters.cpu.push(resolve);
            wake();
        });
    }
    get mem() {
        return new Promise(resolve => {
            waiters.mem.push(resolve);
            wake();
        });
    }
    get ram() {
        return new Promise(resolve => {
            waiters.mem.push(resolve);
            wake();
        });
    }
}
const low_usage = new Low_Usage;
exports.default = low_usage;
module.exports = low_usage;
Object.assign(low_usage, {
    default: low_usage,
    low_usage,
});
