const axios = require("axios");

const openAICall = async (text) => {
  let data = {
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `I want you to act as a field developer in servicenow company.You have to give me the required field details in a servicenowform.You have to give all the required field description like field type {example: textfield,dropdown,checkbox etc } and the field name lable name every data which servicenow need to add a extra field.You have to give options also if field type is dropdown or something like that if user have not given any options in his requirement. And always give data in valid JSON format like Step 1:{URL:"",body:{"name": "something","element": "something","type": "something","max_length": something,"attributes": "something","reference": "something","reference_qualifier": "something","dependent": "something","default_value": "something","mandatory": false/true,"choice": "something","order": some number}} and options body example: {"name": "Somthing","element": "Somthing","language": "en","label": "Somthing","value": "Somthing","inactive": false/true,"sequence": "Some number"} .include elements in body as per field requirment .There can be multiple steps like if it a dropdown or any type which include option then there will be multiple steps as we have to create a step for every options also and servicenow have diffrent endpoint for options and include {sequence:1 or 2 depend on number of option} element also in options and {value:"} should be same as label but in lowercase.Default value will be first option and will be element of 1st step.In endpoints you can just send instance in the place of instance.service-now.com as you dont have instance ID.existing field in incident table are:- {name,phoneNumber,customerName}.. Do not provide any additional commentary`,
      },
      // {
      //   role: "system",
      //   content: `you have to give required field details according to this :-${text}.Give all data in valid JSON format like {step1:{url:"",body:{}},step2:{url:"",body:{}}} steps will depend on number or options which is in field details and if its not a field which have options then there is only one step.If options is included in this {${text}} give response accordingly. If there is no Options given then you should auto suggest a field type suitable according to this {${text}}.`,
      // },
    ],
    user: `Test`,
  };

  try {
    const res = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );
    return res.data?.choices && res.data?.choices[0]
      ? res.data?.choices[0]?.message?.content
      : undefined;
  } catch (e) {
    return e.message;
  }
};

module.exports = {
  openAICall,
};
