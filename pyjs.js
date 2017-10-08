class StopIteration extends Error {
	constructor(message) {
		super(message);
		this.name = "StopIteration";
	}
}

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

function dict(iterable) {
	if (typeof iterable === "undefined")
		return new Map();
	if (Symbol.iterator in iterable)
		return new Map(iterable);
	if (typeof iterable === "object")
		return new Map(zip(Object.keys(iterable), 
			Object.keys(iterable).map(k => iterable[k])));
	throw new TypeError(`'${typeof iterable}' object is not iterable`);
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

function list(iterable=[]) {
	if (!(Symbol.iterator in iterable))
		throw new TypeError(`'${typeof iterable}' object is not iterable`);
	return Array.from(iterable);
}

function len(s) {
	if (!("length" in s))
		throw new TypeError(`object of type '${typeof s}' has no len()`);
	return s.length;
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
		throw new StopIteration();
	}
	return n.value;
}

function print(...args) {
	console.log.apply(this, args);
}

function range(a, b, step=1) {
	if (typeof b === "undefined") {
		b = a;
		a = 0;
	}
	const constraint = step > 0 ? (x => x < b) : (x => x > b);
	
	const gen = function*() {
		let x = a;
		while (constraint(x)) {
			yield x;
			x += step;
		}
	};
	gen[Symbol.iterator] = function() {
		return gen();
	};
	return gen;
}

function* reversed(iterable) {
	if (!(iterable instanceof Array))
		iterable = Array.from(iterable);
	for (let i = iterable.length-1; i >= 0; --i)
		yield iterable[i];
}

function set(iterable) {
	return new Set(iterable);
}

function sorted(iterable, {key=null, reverse=false}={}) {
	let result = Array.from(iterable);
	if (key === null)
		key = x => x;
	result.sort((a,b) => {
		a = key(a);
		b = key(b);
		if (a > b) {
			if (reverse)
				return -1;
			return 1;
		}
		else if (a < b) {
			if (reverse)
				return 1;
			return -1;
		}
		return 0;
	});
	return result;
}

function sum(iterable, start=0) {
	let result = start;
	for (let x of iterable)
		result += x;
	return result;
}

function vars(obj=this) {
	return Object.keys(obj);
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