const show_time = async (url, token, time) => {
  console.log("runnning");

  const response = await fetch(`${url}api/counter/list-show-times`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "api-token": token
    }
  });
  const data = await response.json();
  console.log("-------------------------:", data);
  return data;
};

export default show_time;