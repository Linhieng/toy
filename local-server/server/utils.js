const os = require('os')

/**
 *
 * @returns {number[]} 返回本机 IPv4 数组
 */
function getLocalIPv4() {
	const ips = []
	const networkInterfaces = os.networkInterfaces()

	Object.keys(networkInterfaces).forEach(interfaceName => {
		networkInterfaces[interfaceName].forEach(iface => {
			if (/ipv4/i.test(iface.family)) {
				ips.push(iface.address)
			}
		})
	})

	return ips
}

/**
 *
 * @param {number} port
 */
function logUrlWithPort(port) {
	const ipv4s = getLocalIPv4()
	let output = `http://localhost:${port}\n`
	ipv4s.forEach(ipv4 => output += `http://${ipv4}:${port}\n`)
	return output
}

module.exports = {
	getLocalIPv4,
	logUrlWithPort
}
