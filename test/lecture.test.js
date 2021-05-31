const { User, Lecture, sequelize } = require("../models");
const request = require("supertest");
const app = require("../app");
const { encrypt } = require("../helpers/jwt");

const lectureData = {
  name: "English Lesson",
  quota: 1,
  credits: 3,
  schedule: "16.30",
};

const studentData = {
  fullName: "budi utomo",
  address: "jl. kelapa lilin no 15",
  birthdate: "1997-03-21",
  ipk: 3.25,
  password: "password123",
  email: "budi.utomo@hacktivmail.com",
  sks: 21,
  ukt: 13000000,
  uktStatus: true,
  phoneNumber: "+62 834-3541-63367",
  role: "student",
};

let student_token;

beforeAll((done) => {
  User.create(studentData)
    .then((user) => {
      student_id = user.id;
      const studentPayload = {
        id: user.id,
        email: user.email,
        role: user.role,
      };
      student_token = encrypt(studentPayload);
      return Lecture.create(lectureData);
    })
    .then((lecture) => {
      lecture_id = lecture.id;
      done();
    })
    .catch();
});

afterAll((done) => {
  User.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  })
    .then(() => {
      return Lecture.destroy({
        truncate: true,
        restartIdentity: true,
        cascade: true,
      }).then(() => {
        sequelize.close();
        done();
      });
    })
    .catch();
});

// failed get all no access token
describe("GET class/ FAILED", () => {
  test("Should send response status 401", (done) => {
    request(app)
      .get("/lectures")
      .then((res) => {
        expect(res.statusCode).toEqual(401);
        expect(typeof res.body).toEqual("object");
        expect(res.body.message).toEqual("Harap Masuk Terlebih Dahulu");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

//failed get by id no lecture found
describe("GET class/ FAILED", () => {
  test("Should send response status 404", (done) => {
    request(app)
      .get("/lectures/10")
      .set("access_token", student_token)
      .then((res) => {
        expect(res.statusCode).toEqual(404);
        expect(typeof res.body).toEqual("object");
        expect(res.body.message).toEqual("Kuliah tidak ditemukan");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

//success get by id
describe("GET class/ SUCCESS", () => {
  test("Should send response status 200", (done) => {
    request(app)
      .get("/lectures/1")
      .set("access_token", student_token)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("quota");
        expect(res.body).toHaveProperty("credits");
        expect(res.body).toHaveProperty("schedule");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

//success get all
describe("GET class/ SUCCESS", () => {
  test("Should send response status 200", (done) => {
    request(app)
      .get("/lectures")
      .set("access_token", student_token)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(typeof res.body).toEqual("object");
        expect(res.body[0]).toHaveProperty("name");
        expect(res.body[0]).toHaveProperty("quota");
        expect(res.body[0]).toHaveProperty("credits");
        expect(res.body[0]).toHaveProperty("schedule");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
