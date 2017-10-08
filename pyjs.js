export function all(iterable) {
	for (let x of iterable) {
		if (!x)
			return false;
	}
	return true;
}

export function any(iterable) {
	for (let x of iterable) {
		if (x)
			return true;
	}
	return false;
}

export function iter(iterable) {
	return iterable[Symbol.iterator]();
}

export function next(iterator, defaultVal) {
	const n = iterator.next();
	if (n.done) {
		if (typeof defaultVal !== "undefined")
			return defaultVal;
		throw new Error("StopIteration");
	}
	return n.value;
}

export function* range(a, b, step=1) {
	if (typeof b === "undefined") {
		b = a;
		a = 0;
	}
	const constraint = step > 0 ? (x => x < b) : (x => x > b);
	let x = a;
	while (constraint(x)) {
		yield x;
		x += step;
	}
}

export function* zip(...iterables) {
	const iterators = iterables.map(i => iter(i));
	while (iterators) {
		let tuple = [];
		for (let it of iterators) {
			try {
				tuple.push(next(it));
			}
			catch (e) {
				return;
			}
		}
		yield tuple;
	}
	return;
}