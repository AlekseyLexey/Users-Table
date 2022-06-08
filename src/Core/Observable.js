class Observable {
	subscribers = new Map();

	subscribe(subscriber) {
		const key = Symbol('key');
		this.subscribers.set(key, subscriber);

		return () => {
			if (this.subscribers.has(key)) {
				this.subscribers.delete(key);
				return true;
			}

			return false;
		};
	}

	dispatch(...data) {
		for (const subscriber of this.subscribers.values()) {
			subscriber(...data);
		}
	}
}

export default Observable;