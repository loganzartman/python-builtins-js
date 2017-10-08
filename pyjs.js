function all(iterable) {
	for (let x of iterable) {
		if (!x)
			return false;
	}
	return true;
}

function any(iterable) {
	for (let x of iterable) {
		if (x)
			return true;
	}
	return false;
}

function* range(a, b, step=1) {
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

function* zip(...iterables) {
	const iterators = iterables.map(i => i[Symbol.iterator]());
	while (iterators) {
		let tuple = [];
		for (let it of iterators) {
			const n = it.next();
			if (n.done)
				return;
			tuple.push(n.value);
		}
		yield tuple;
	}
	return;
}