export const requestManager = async (url_server, method, data) => {
  const fetchData = await fetch(url_server, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    // mode: 'no-cors',
    body: JSON.stringify(data ? data : {}),

    
  });
  console.log(data);

  return fetchData;
};
