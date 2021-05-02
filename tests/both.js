debugger;

const {
	cpuFree,
	freememPercentage,
} = require('os-utils');
const low_usage = require('..');

low_usage.ram.then(() => console.log('RAM is free! O=)'));
low_usage.cpu.then(() => console.log('CPU is free! O=)'));

module.exports = async () => new Promise(async resolve => {
	cpuFree((p) => `CPU usage is ${100 - p * 100}%`);
	console.log(`RAM usage is ${100 - freememPercentage() * 100}%`);
	await low_usage.ram;
	console.log('Ram check passed!');
	await low_usage.cpu;
	console.log('CPU check passed!');
	low_usage.ram.then(() => low_usage.cpu).then(() => {
		console.log('Checks finished!');
		return resolve(true);
	});
});
