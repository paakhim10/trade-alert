import app from "./app.js";

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
