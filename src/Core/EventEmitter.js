class EventEmitter {
	handlers = new Map();

	addEventListener(event, handler) {
		if (!this.handlers.has(event)) {
			this.handlers.set(event, new Set());
		}

		this.handlers.get(event).add(handler);
	}

	removeEventListener(event, handler) {
		if (this.handlers.has(event)) {
			this.handlers.get(event).delete(handler);
		}

		if (!this.handlers.get(event).size) {
			this.handlers.delete(handler);
		}
	}

	on(...args) {
		return this.addEventListener(...args);
	}

	off(...args) {
		return this.removeEventListener(...args);
	}

	emit(event, ...data) {
		if (this.handlers.has(event)) {
			for (const handler of this.handlers.get(event)) {
				handler(...data);
			}
		}
	}
}

export default EventEmitter;