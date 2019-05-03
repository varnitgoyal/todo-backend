var chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
var { todosModel } = require("../db/models/todo-model");
var { db } = require("../connection");
let app = require("../app");
chai.use(chaiHttp);

describe("Todos", () => {
  beforeEach(done => {
    console.log(process.env.NODE_ENVIROMENT);
    //checking if env variable is set
    if (process.env.NODE_ENVIROMENT !== "test") {
      console.log("NODE_ENVIROMENT is not set to test ");
      process.exit();
    }
    //Before each test we empty the database
    db.dropDatabase().then(res => {
      //creating  a sample record
      let todo = {
        text: "sample todo",
        isDone: false
      };
      chai
        .request(app)
        .post("/todos")
        .send(todo)
        .end((err, res) => {
          done();
        });
    });
  });

  describe("testing get todos request", () => {
    it("let's get todos", done => {
      chai
        .request(app)
        .get("/todos")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.should.have.length(1);
          done();
        });
    });
  });

  describe("lets post a todo", () => {
    it("let's post a todo", done => {
      let todo = {
        text: "sample todo",
        isDone: false
      };
      chai
        .request(app)
        .post("/todos")
        .send(todo)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("_id");
          res.body.should.have.property("text").eql("sample todo");
          res.body.should.have.property("isDone").eql(false);
          res.body.should.have.property("__v").eql(0);

          done();
        });
    });
  });

  describe("delete a todo", () => {
    it("let's delete a todo", done => {
      //finding id of todo before deleting it from todo-model
      todosModel
        .findOne({ text: "sample todo" }, { _id: 1 })
        .then(res => {
          chai
            .request(app)
            .delete(`/todos?id=${res._id}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property("ok").eql(1);
              res.body.should.have.property("deletedCount").eql(1);
              done();
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  });

  describe("update a todo", () => {
    it("let's update a todo", done => {
      let todo = {
        text: "changed todo"
      };
      //finding id of todo before deleting it from todo-model

      todosModel
        .findOne({ text: "sample todo" }, { _id: 1 })
        .then(res => {
          chai
            .request(app)
            .patch(`/todos?id=${res._id}`)
            .send(todo)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property("ok").eql(1);
              res.body.should.have.property("nModified").eql(1);
              done();
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  });
});
