const request = require("supertest");
const app = require("../app");
const db = require("../db");
const books = require("../routes/books");
const Book = require("../models/book");

process.env.NODE_ENV = 'test';


describe("POST /books", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM books");
    await Book.create({
        "isbn": "0691161518",
        "amazon_url": "http://a.co/eobPtX2",
        "author": "Matthew Lane",
        "language": "english",
        "pages": 264,
        "publisher": "Princeton University Press",
        "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        "year": 2017
      });
  });

  test("base test", async function () {
    expect(1).toEqual(1);
  });

  test("get book info", async function () {
    const response = await request(app).get("/books")

    expect(response.body.books).toEqual([{
        "isbn": "0691161518",
        "amazon_url": "http://a.co/eobPtX2",
        "author": "Matthew Lane",
        "language": "english",
        "pages": 264,
        "publisher": "Princeton University Press",
        "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        "year": 2017
    }]);
  });

    test("can create new books", async function () {
      await request(app)
        .post("/books")
        .send({
            "isbn": "0763687588",
            "amazon_url": "https://www.amazon.com/Princess-Black-Perfect-Party/dp/0763687588/ref=rtpb_d_sccl_2/139-6409375-5712632?pd_rd_w=76zHt&content-id=amzn1.sym.1683dfe1-057b-4d4c-8805-d9459571c690&pf_rd_p=1683dfe1-057b-4d4c-8805-d9459571c690&pf_rd_r=5R8HTBVJGJ8X9Q7PJX6H&pd_rd_wg=Be5US&pd_rd_r=90416488-ba0e-4898-bcc2-0d145fae1901&pd_rd_i=0763687588&psc=1",
            "author": "Shannon Hale & Dean Hale",
            "language": "english",
            "pages": 96,
            "publisher": "Candlewick",
            "title": "The Princess in Black and the Perfect Princess Party",
            "year": 2016
          });
          
      let response = await request(app).get("/books/0763687588")

      expect(response.body.book).toEqual({
        "isbn": "0763687588",
        "amazon_url": "https://www.amazon.com/Princess-Black-Perfect-Party/dp/0763687588/ref=rtpb_d_sccl_2/139-6409375-5712632?pd_rd_w=76zHt&content-id=amzn1.sym.1683dfe1-057b-4d4c-8805-d9459571c690&pf_rd_p=1683dfe1-057b-4d4c-8805-d9459571c690&pf_rd_r=5R8HTBVJGJ8X9Q7PJX6H&pd_rd_wg=Be5US&pd_rd_r=90416488-ba0e-4898-bcc2-0d145fae1901&pd_rd_i=0763687588&psc=1",
        "author": "Shannon Hale & Dean Hale",
        "language": "english",
        "pages": 96,
        "publisher": "Candlewick",
        "title": "The Princess in Black and the Perfect Princess Party",
        "year": 2016
      });
  });

  test("can edit a book", async function () {
    await request(app)
      .put("/books/0691161518")
      .send({
        "isbn": "0691161518",
        "amazon_url": "http://a.co/eobPtX2",
        "author": "Matthew Maine",
        "language": "english",
        "pages": 264,
        "publisher": "Princeton University Press",
        "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        "year": 2017
      });
        
    let response = await request(app).get("/books/0691161518")

    expect(response.body.book).toEqual({
      "isbn": "0691161518",
      "amazon_url": "http://a.co/eobPtX2",
      "author": "Matthew Maine",
      "language": "english",
      "pages": 264,
      "publisher": "Princeton University Press",
      "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      "year": 2017
    });
});

test("can delete a book", async function () {
  const response = await request(app)
    .delete("/books/0691161518");
      
  expect(response.body).toEqual({ message: "Book deleted" });
});

afterAll(async function() {
    await db.end();
});

});



