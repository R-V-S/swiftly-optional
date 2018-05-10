const Optional = function(subject) {
  const createBlackhole = type => {
    const blackhole = new Proxy({ [`is${type}`]: true}, { get: (t,p) => { if (p === 'isUndefined' || p === 'isNull') { return true }; if (p[p.length-1] === '_') { return blackhole } } })
    return blackhole 
  }

  if (subject === undefined) { subject = createBlackhole('Undefined') }
  if (subject === null) { subject = createBlackhole('Null') }
  return new Proxy(subject, {
    get: (t,p) => {
      if (p[p.length-1] !== '_') { return t[p] }
      const propertyName = p.substr(0,p.length-1)
      const property = t[propertyName]
      if (property === undefined) {
        return createBlackhole('Undefined')
      } else if (property === null) {
        return createBlackhole('Null')
      } else if (typeof property === 'object') {
        return new Optional(property)
      } else {
        return property
      }
    }
  })
}

module.exports = Optional