const my_collection = async (url, token, time) => {
  console.log("runnning");

  const response = await fetch(`${url}api/counter/my-collection`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-token": token
    },
    body: JSON.stringify({
     show_time:{time}
    })
  });
  const data = await response.json();
  console.log("-------------------------:", data);
  return data;
};

export default my_collection;