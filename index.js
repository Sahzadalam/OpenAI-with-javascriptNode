require("dotenv").config();

const express = require("express");
const app = express();
const { openAICall } = require("./util/openai.util");

const init = async () => {
  app.get("/open-ai", async (req, res) => {
    try {
      let response = await openAICall("Create gender field on Incident table");
      return res.json({
        success: true,
        data: {
          data: JSON.parse(response),
        },
      });
    } catch (e) {
      return res.json({
        success: false,
        message: e.message,
      });
    }
  });
  app.listen(process.env.PORT, () => {
    console.log(`app running on ${process.env.PORT}`);
  });
};

init();
