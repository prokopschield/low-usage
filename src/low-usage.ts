import {
	cpuFree,
	freememPercentage,
} from 'os-utils';

let wake: Function = () => {};

const waiters: {
	cpu: Array<() => void>,
	mem: Array<() => void>,
} = ({
	cpu: [],
	mem: [],
});

(async function () {
	while (true) {
		await new Promise(resolve => {
			if (waiters.cpu.length) {
				cpuFree((percentage: number) => {
					if (percentage > 0.3) {
						const callback = waiters.cpu.pop();
						resolve(typeof callback === 'function' && callback());
					} else setTimeout(resolve, 777);
				});
			} else if (waiters.mem.length) {
				if (freememPercentage() > 0.4) {
					const callback = waiters.mem.pop();
					resolve(typeof callback === 'function' && callback());
				} else setTimeout(resolve, 777);
			} else wake = () => resolve(wake = () => {});
		});
	}
})();

class Low_Usage {
	get cpu (): Promise<void> {
		return new Promise(resolve => {
			waiters.cpu.push(resolve);
			wake();
		});
	}
	get mem (): Promise<void> {
		return new Promise(resolve => {
			waiters.mem.push(resolve);
			wake();
		});
	}
	get ram (): Promise<void> {
		return new Promise(resolve => {
			waiters.mem.push(resolve);
			wake();
		});
	}
}

const low_usage = new Low_Usage;

export default low_usage;
module.exports = low_usage;

Object.assign(low_usage, {
	default: low_usage,
	low_usage,
});
