const chai = require('chai');
const dirtyChai = require('dirty-chai');
const { ObjectId } = require('mongoose').Types;
const Employee = require('./employeeModel');

const { expect } = chai;

chai.use(dirtyChai);

describe('Employee', () => {
  const id = ObjectId();
  context('validation', () => {
    it('should use specified id if there is one', () => {
      const empid = ObjectId();
      const emp = new Employee({
        _id: empid,
        startDate: new Date(),
        lastChanged: new Date(),
      });
      expect(emp).to.have.property('_id');
      expect(emp._id).to.be.equal(empid);
    });
    it('should create a new id if there is no id', () => {
      const emp = new Employee({
        startDate: new Date(),
        lastChanged: new Date(),
      });
      expect(emp).to.have.property('_id');
      expect(emp._id).to.not.be.null();
    });
    it('should throw validation error if there is no firstName', (done) => {
      const newEmployee = {
        _id: id,
        lastName: 'Smith',
        email: 'Test@test.com',
        birthday: '1996-07-23',
        city: 'Copenhagen',
        country: 'Denmark',
        street: 'streetest',
        phoneNumber: '45887459',
        startDate: new Date(),
        lastChanged: new Date(),
        links: [],
      };
      const emp = new Employee(newEmployee);
      emp.validate((error) => {
        expect(error.errors).to.have.property('firstName');
        done();
      });
    });
    it('should throw validation error if there is no lastName', (done) => {
      const newEmployee = {
        _id: id,
        firstName: 'John',
        email: 'Test@test.com',
        birthday: '1996-07-23',
        city: 'Copenhagen',
        country: 'Denmark',
        street: 'streetest',
        phoneNumber: '45887459',
        startDate: new Date(),
        lastChanged: new Date(),
        links: [],
      };
      const emp = new Employee(newEmployee);
      emp.validate((error) => {
        expect(error.errors).to.have.property('lastName');
        done();
      });
    });
    it('should throw validation error if there is no email', (done) => {
      const newEmployee = {
        _id: id,
        firstName: 'John',
        lastName: 'Smith',
        birthday: '1996-07-23',
        city: 'Copenhagen',
        country: 'Denmark',
        street: 'streetest',
        phoneNumber: '45887459',
        startDate: new Date(),
        lastChanged: new Date(),
        links: [],
      };
      const emp = new Employee(newEmployee);
      emp.validate((error) => {
        expect(error.errors).to.have.property('email');
        done();
      });
    });
    it('should throw validation error if email doesnt match email pattern', (done) => {
      const newEmployee = {
        _id: id,
        firstName: 'John',
        lastName: 'Smith',
        email: 'dsfsdfdsfdsf',
        birthday: '1996-07-23',
        city: 'Copenhagen',
        country: 'Denmark',
        street: 'streetest',
        phoneNumber: '45887459',
        startDate: new Date(),
        lastChanged: new Date(),
        links: [],
      };
      const emp = new Employee(newEmployee);
      emp.validate((error) => {
        expect(error.errors).to.have.property('email');
        done();
      });
    });
    it('should throw validation error if there is no birthday', (done) => {
      const newEmployee = {
        _id: id,
        firstName: 'John',
        lastName: 'Smith',
        email: 'test@test.com',
        city: 'Copenhagen',
        country: 'Denmark',
        street: 'streetest',
        phoneNumber: '45887459',
        startDate: new Date(),
        lastChanged: new Date(),
        links: [],
      };
      const emp = new Employee(newEmployee);
      emp.validate((error) => {
        expect(error.errors).to.have.property('birthday');
        done();
      });
    });
    it('should throw validation error if there is no city', (done) => {
      const newEmployee = {
        _id: id,
        firstName: 'John',
        lastName: 'Smith',
        email: 'test@test.com',
        birthday: '1996-07-23',
        country: 'Denmark',
        street: 'streetest',
        phoneNumber: '45887459',
        startDate: new Date(),
        lastChanged: new Date(),
        links: [],
      };
      const emp = new Employee(newEmployee);
      emp.validate((error) => {
        expect(error.errors).to.have.property('city');
        done();
      });
    });
    it('should throw validation error if there is no country', (done) => {
      const newEmployee = {
        _id: id,
        firstName: 'John',
        lastName: 'Smith',
        email: 'test@test.com',
        birthday: '1996-07-23',
        city: 'Denmark',
        street: 'streetest',
        phoneNumber: '45887459',
        startDate: new Date(),
        lastChanged: new Date(),
        links: [],
      };
      const emp = new Employee(newEmployee);
      emp.validate((error) => {
        expect(error.errors).to.have.property('country');
        done();
      });
    });
    it('should throw validation error if there is no street', (done) => {
      const newEmployee = {
        _id: id,
        firstName: 'John',
        lastName: 'Smith',
        email: 'test@test.com',
        birthday: '1996-07-23',
        city: 'Denmark',
        country: 'streetest',
        phoneNumber: '45887459',
        startDate: new Date(),
        lastChanged: new Date(),
        links: [],
      };
      const emp = new Employee(newEmployee);
      emp.validate((error) => {
        expect(error.errors).to.have.property('street');
        done();
      });
    });
    it('should throw validation error if there is no phoneNumber', (done) => {
      const newEmployee = {
        _id: id,
        firstName: 'John',
        lastName: 'Smith',
        email: 'test@test.com',
        birthday: '1996-07-23',
        city: 'Denmark',
        country: 'streetest',
        phoneNumber: '45887459',
        startDate: new Date(),
        lastChanged: new Date(),
        links: [],
      };
      const emp = new Employee(newEmployee);
      emp.validate((error) => {
        expect(error.errors).to.have.property('street');
        done();
      });
    });
    it('should create a new date for startDate if there is no date', () => {
      const emp = new Employee({
        _id: id,
        firstName: 'John',
        lastName: 'Smith',
        email: 'test@test.com',
        birthday: '1996-07-23',
        city: 'Denmark',
        country: 'streetest',
        phoneNumber: '45887459',
        lastChanged: new Date(),
      });
      expect(emp).to.have.property('startDate');
      expect(emp.startDate).to.be.a('date');
      expect(emp.startDate).to.not.be.null();
    });
    it('should create a new date for lastChanged if there is no date', () => {
      const emp = new Employee({
        _id: id,
        firstName: 'John',
        lastName: 'Smith',
        email: 'test@test.com',
        birthday: '1996-07-23',
        city: 'Denmark',
        country: 'streetest',
        phoneNumber: '45887459',
        startDate: new Date(),
      });
      expect(emp).to.have.property('lastChanged');
      expect(emp.startDate).to.be.a('date');
      expect(emp.startDate).to.not.be.null();
    });
  });
  context('methods', () => {
    describe('SetUpHyperLinks', () => {
      it('should set up the hyper links in the models links property', () => {
        const emp = new Employee({
          _id: id,
          firstName: 'John',
          lastName: 'Smith',
          email: 'test@test.com',
          birthday: '1996-07-23',
          city: 'Denmark',
          country: 'streetest',
          phoneNumber: '45887459',
          startDate: new Date(),
          links: [],
        });
        emp.SetUpHyperLinks('hostname', 'url', {});

        expect(emp.links).to.be.an('array');
        expect(emp.links).to.not.be.empty();
        expect(emp.links[0]).to.have.property('rel');
        expect(emp.links[0]).to.have.property('type');
        expect(emp.links[0]).to.have.property('href');
        expect(emp.links[0]).to.have.property('description');
      });
    });
  });
});
