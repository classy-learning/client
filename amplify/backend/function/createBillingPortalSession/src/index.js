exports.handler = async (event) => {
  console.log(event);
  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
