import assert from "assert";
import request from "supertest";
import app from "../../index.js";

let userToken = "";

before(() => {
    it("it should login user ", done => {
        let body = {
            password: "programming",
            email: "sannimicheal.se@gmail.com"
        };
        request(app)
            .post("/api/v1/auth/login")
            .send(body)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                assert.ok(res.body.token, "Token must contain a value");
                // assert.isObject(res.body.data, "Data must be an object");
                assert.equal(res.body.message, "Authentication Successful");
                userToken = res.body.token;
                done();
            });
    });
});

describe(" STORE POST REQUESTS ", () => {
    it("it should not attempt to save a new store if all fields or object is empty - - api/v1/store - POST ", done => {
        let body = {};
        request(app)
            .post("/api/v1/store")
            .set("x-access-token", userToken)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err, res) => {
                assert.equal(res.body.statusMessage, "Please fill all fields");
                done();
            });
    });
    it("it should not attempt to save a new store if any of the fields is empty - api/v1/store - POST ", done => {
        let body = {
            name: "",
            pictures_url: "",
            address: "",
            city_code: "",
            state_code: "",
            country_code: "",
            description: ""
        };
        request(app)
            .post("/api/v1/store")
            .set("x-access-token", userToken)
            .send(body)
            .expect("Content-Type", /json/)
            .expect(400)
            .end((err, res) => {
                assert.equal(
                    res.body.statusMessage,
                    "name is not allowed to be empty"
                );
                done();
            });
    });
});

describe(" STORE GET REQUESTS", () => {
    it("it should get store by id - api/v1/store/:id - GET ", done => {
        request(app)
            .get("/api/v1/store/e57284c9-7b59-4fb0-977f-587cec29ebe7")
            .set("x-access-token", userToken)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                assert.equal(
                    res.body.statusMessage,
                    "Successfully fetched store"
                );
                done();
            });
    });
    it("it should get all stores created by logged-in user - api/v1/store/all - GET ", done => {
        request(app)
            .get("/api/v1/store/all")
            .set("x-access-token", userToken)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                assert.equal(
                    res.body.statusMessage,
                    "Successfully fetched all stores created by user"
                );
                done();
            });
    });
});
