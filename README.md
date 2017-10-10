# python-builtins-js
Python builtins implemented as closely as possible in JS

## Why?
Why not

## Example
```python
divisors = lambda x: filter(lambda i: x%i==0, range(1, x//2+1))
isPrime = lambda x: all(map(lambda i:  i == x or i == 1, divisors(x)))
p1k = filter(lambda x: isPrime(x), range(2, 1000)) 
```

```javascript
divisors = x => filter(i => x%i===0, range(1, x/2+1))
isPrime = x => all(map(i => i === x || i === 1, divisors(x)))
p1k = filter(x => isPrime(x), range(2, 1000))
```