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