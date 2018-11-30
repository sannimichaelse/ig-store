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

describe(" Create New Store - api/v1/store - POST ", () => {
    it("it should not attempt to save a new store if all fields or object is empty ", done => {
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
    it("it should not attempt to save a new store if any of the fields is empty ", done => {
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

// describe("Testing Login Route - api/v1/login ", () => {
//     it("it should not attempt to login a new user if any or all fields are empty ", done => {
//         let body = {
//             password: "",
//             email: "sannimichaellelsss@gmail.com"
//         };
//         request(app)
//             .post("/api/v1/auth/login")
//             .send(body)
//             .expect("Content-Type", /json/)
//             .expect(400)
//             .end((err, res) => {
//                 assert.equal(res.body.responseCode, "01");
//                 assert.equal(
//                     res.body.responseMessage,
//                     '"password" is not allowed to be empty'
//                 );
//                 done();
//             });
//     });
//     it("it should return invalid login details ", done => {
//         let body = {
//             password: "tomiwa5259333",
//             email: "sannimicheal.se@gmail.com"
//         };
//         request(app)
//             .post("/api/v1/auth/login")
//             .send(body)
//             .expect("Content-Type", /json/)
//             .expect(400)
//             .end((err, res) => {
//                 assert.equal(
//                     res.body.responseMessage,
//                     "Wrong Password and Email Combination"
//                 );
//                 done();
//             });
//     });
// });

// describe("Change Password - api/v1/auth/changepassword ", () => {
//     it("it should not attempt to change password if access-token is empty ", done => {
//         let body = {
//             email: "sannimichaelse@gmail.com"
//         };
//         request(app)
//             .post("/api/v1/auth/changepassword")
//             .set("x-access-token", "")
//             .send(body)
//             .expect("Content-Type", /json/)
//             .expect(403)
//             .end((err, res) => {
//                 assert.equal(res.body.message, "No token provided.");
//                 assert.equal(res.body.verifyToken, false);
//                 done();
//             });
//     });

//     it("it should not attempt to change password if email is wrong ", done => {
//         let body = {
//             email: "sannimichaelse@gmail.com"
//         };
//         request(app)
//             .post("/api/v1/auth/changepassword")
//             .set(
//                 "x-access-token",
//                 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYzM3YWE5ZTQtZGRlMy00NDMzLThiMGUtZGQ4ZGQwNjNkMWE1IiwiaWF0IjoxNTQwOTI4Nzc2LCJleHAiOjE1NDEwMTUxNzZ9.VTDL1GqoVdhq_PHodVspX-ccdFhOTbkolwdO2k3yeMY"
//             )
//             .send(body)
//             .expect("Content-Type", /json/)
//             .expect(400)
//             .end((err, res) => {
//                 assert.equal(res.body.responseCode, "01");
//                 assert.equal(res.body.responseMessage, "user does not exist");
//                 done();
//             });
//     });
// });
