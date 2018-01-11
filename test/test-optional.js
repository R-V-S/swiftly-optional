const chai = require('chai')
const Optional = require('./../index')

describe('Optionals', () => {
  beforeEach( () => {
    this.optional = new Optional({b: 5, c: {d: 'e'}})

  })
  it(`should return the subject when directly referenced`, () => {
    chai.expect(this.optional).to.eql( { b: 5, c: { d: 'e' } } )
  })
  it(`should return a valid child property's actual value`, () => {
    chai.expect(this.optional.b).to.eql( 5 )
  })
  it(`should return undefined for undefined child properties`, () => {
    chai.expect(this.optional.z).to.be.undefined
  })
  it(`should return a value if a primitive child property name ends in an underscore`, () => {
    chai.expect(this.optional.b_).to.eql( 5 )
  })
  it(`should return an value if an object child property name ends in an underscore`, () => {
    chai.expect(this.optional.c_).to.eql( {d: 'e'} )
  })
  it(`should return undefined for a.b_.c if a.b is undefined`, () => {
    chai.expect(this.optional.z_.y).to.be.undefined
  })
  it(`should work when passed a nested object`, () => {
    chai.expect(this.optional.z_.y_.x_.w).to.be.undefined
    chai.expect(this.optional.c_.d_.z).to.be.undefined
  })
  it(`should fail when trying to access a child of a primitive property`, () => {
    try {
      chai.expect(this.optional.c_.d_.z_.y_.x).to.be.undefined
    } catch(e) {
      chai.expect(e.name).to.eql('TypeError')
      chai.expect(e.message).to.eql(`Cannot read property 'y_' of undefined`)
    }
  })
})