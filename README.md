# Swiftly Optional

Optionals for JavaScript, inspired by Swift. 

## Installation

Install via `npm`:

```js
npm i swiftly-optional
```

Import the module in Node:

```js
const Optional = require('swiftly-optional')
```

Or in Babel:

```js
import Optional from 'swiftly-optional';
```

## Usage

First, wrap an object in a new `Optional` construction:

```
const myOptional = new Optional(objData)
```

Now, when accessing an object, you can add an underscore to object properties that may or may not exist, and JS won't throw errors:

```
myOptional.a_.b_.c_.d
```

In the example above, if any of the properties `a`, `b`, or `c` do not exist, then `undefined` will be returned. 

## Why do I need this?

Handling nested properties of an object in JavaScript is clumsy and verbose. Let's say we want to display a user's hometown as a string with a "city, country" format. A user object might look like this:

```js
user = {
  name: 'Joe',
  profile: {
    location: {
      city: 'Boston',
      country: 'USA'
    } 
  }
}
```

Or it might be less complete and look like this:

```js
user = {
  name: 'Joe',
  profile: null
}
```

Or it might have not been found at all, in which case `user` might simply be `undefined`. How do we handle these unknowns? Well, of course, in a perfect world, the structure of the object would be entirely consistent and we could always get away with this:

```js
`${user.profile.location.city}, ${user.profile.location.country}`
```

But if we can't guarantee that, for whatever reason, then we need to check our values before we attempt to access them. What many devs intuitively want to do is:

```js
const location = user.profile.location
if (location) { return `${location.city}, ${location.country}`}
```

But if `user` or `user.profile` are `undefined` or `null`, then we'll get an error. So then we can either check for truthiness at every level of nesting:

```js
if (user && user.profile && user.profile.location) {
  const location = user.profile.location
  return `${location.city}, ${location.country}`
}
```

Or we can use a `try`/`catch` block:

```js
let location = ''
try {
  location = user.profile.location
} catch (e) {}
return `${location.city}, ${location.country}`
```

There are many variations of those two basic approaches, and they do work. But they're not elegant. Swift's optionals provide a simple, clean way of accessing nested values without hitting errors. A Swift optional might look like this:

```swift
let location = user.profile?.location
if (location != nil) { return location!.city + ", " + location!.country }
```

That happens to be remarkably similar to the intuitive approach that most developers _want_ to take in JS, but can't. 

**Enter Optionals.**

Unfortunately, question marks aren't valid variable names, so we can't imitate Swift perfectly. But underscores are valid, and we can use them as a substitute. Here's the example above, with Swiftly Optionals, for JavaScript™️:

```js
let user = new Optional(userData)
let location = user.profile_.location
if (location) { return `${location.city}, ${location.country}` }
```

Not too shabby. Here's a complete example:

```js
const Optional = require('swiftly-optional')

const users = [
  {
    name: 'Joe',
    profile: {
      location: {
        city: 'Boston',
        country: 'USA'
      } 
    }
  }, {
    name: 'Joe',
    profile: null
  }, 
  undefined
]

users.forEach( user => {
  let location = Optional(user).profile_.location
  if (location) {
    console.log( `${location.city}, ${location.country}` )
  }
})

```
