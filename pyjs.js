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

function* enumerate(iterable, start=0) {
	const iterator = iter(iterable);
	for (let i=start;;++i) {
		try {
			yield [i, next(iterator)];
		}
		catch (e) {
			return;
		}
	}
}

function* filter(f, iterable) {
	for (let x of iterable)
		if (f(x))
			yield x;
}

function iter(iterable) {
	return iterable[Symbol.iterator]();
}

function* map(f, ...iterables) {
	const argSets = zip(...iterables);
	for (let args of argSets)
		yield f.apply(this, args);
}

function next(iterator, defaultVal) {
	const n = iterator.next();
	if (n.done) {
		if (typeof defaultVal !== "undefined")
			return defaultVal;
		throw new Error("StopIteration");
	}
	return n.value;
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

function sum(iterable, start=0) {
	let result = start;
	for (let x of iterable)
		result += x;
	return result;
}

function* zip(...iterables) {
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
}

export {all, any, enumerate, filter, iter, map, next, range, sum, zip};