const express = require("express");
const cors = require("cors");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use("/", router);
//app.use(errorHandler);
app.listen(port, () =>
  console.log(`Civika server is running at http:/localhost:${port}`)
);