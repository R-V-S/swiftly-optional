const chai = require('chai')
const Optional = require('./../index')

describe('Optionals', () => {
  beforeEach( () => {
    this.optional = new Optional({b: 5, c: {d: 'e'}})
    this.user1 = new Optional({
      name: 'Joe',
      profile: {
        location: {
          city: 'Boston',
          country: 'USA'
        } 
      }
    })
    
    this.user2 = new Optional(undefined)

    this.nullOptional = new Optional(null)
    this.undefinedOptional = new Optional(undefined)
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
    chai.expect(this.user1.profile_.location_.city).to.eql('Boston')
  })
  it(`should fail when trying to access a child of a primitive property`, () => {
    chai.expect(() => this.optional.c_.d_.z_.y_.x).to.throw(TypeError)
  })
  it(`should return an object with isUndefined = true for an initial value of undefined`, () => {
    chai.expect(this.undefinedOptional).to.eql({ isUndefined: true })
  })
  it(`should return an object with isNull = true for an initial value of null`, () => {
    chai.expect(this.nullOptional).to.eql({ isNull: true })
  })
  it(`should return undefined for sub-properties of an initial value of undefined or null`, () => {
    chai.expect(this.undefinedOptional.a_.b_.c_.d).to.be.undefined
    chai.expect(this.user2.profile_.location_.city).to.be.undefined
    chai.expect(this.nullOptional.a_.b_.c_.d).to.be.undefined
    chai.expect(this.user2.profile_.location).to.be.undefined
  })
  it(`should error when trying to access a child of a non-optional`, () => {
    chai.expect(() => this.undefinedOptional.a.b).to.throw(TypeError)
  })
})