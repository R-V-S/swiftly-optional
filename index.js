const Optional = function(subject) {
  const blackhole = new Proxy({}, { get: (t,p) => { if (p[p.length-1] === '_') { return blackhole } } })
  return new Proxy(subject, {
    get: (t,p) => {
      if (p[p.length-1] !== '_') { return t[p] }
      const propertyName = p.substr(0,p.length-1)
      const property = t[propertyName]
      if (property === undefined) {
        return blackhole
      }
      if (typeof property === 'object') {
        return new Optional(property)
      } else {
        return property
      }
    }
  })
}

module.exports = Optional