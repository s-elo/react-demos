const express = require("express");
const axios = require("axios");

const demo = express();
const port = 5000;

// Cross-Origin Resource Sharing
// demo.all("*", (_, res, next) => {
//   res.header("Access-Control-Allow-Origin", `*`);
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT");

//   next();
// });

demo.get("/testData", (_, res) => {
  const data = [
    {
      name: "leo",
      age: 18,
      sex: "male",
    },
    {
      name: "leo",
      age: 18,
      sex: "male",
    },
    {
      name: "leo",
      age: 18,
      sex: "male",
    },
  ];

  res.send(data);
});

demo.get("/search/users", (req, res) => {
  axios.get(`https://api.github.com${req.url}`).then(
    (resonse) => {
      res.send(resonse.data);
    },
    (err) => {
      console.log(err);
      const data = [
        {
          avatar_url:
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201408%2F24%2F20140824154253_45Hay.png&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1620810976&t=f98abbb202eb1a140fe5222ddbbb831d",
          login: "failed~",
          html_url: "http://github.com",
        },
      ];

      res.send(data);
    }
  );
});

demo.listen(port, () => console.log(`Listening on port ${port}`));
