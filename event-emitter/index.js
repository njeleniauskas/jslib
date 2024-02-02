/**
 * A class to handle reactive events in an application.
 */

class EventEmitter {
	constructor() {
		this.events = {};
	}

	add(name, callback, index) {
		if (!this.events[name]) {
			this.events[name] = [];
		}

		if (index && index >= 0) {
			if (this.events[name][index]) {
				this.events[name][index].splice(index + 1, 0, callback);
			} else  {
				this.events[name][index] = callback;
			}
		} else {
			this.events[name].push(callback);
		}
	}

	remove(name, callback) {
		if (this.events[name]) {
			this.events[name] = this.events[name].filter((fn) => fn !== callback);
		}
	}

	emit(name, args) {
		const queue = this.events[name];

		if (queue) {
			queue.forEach((callback) => {
				callback(args)
			});
		}
	}
}

export default EventEmitter;