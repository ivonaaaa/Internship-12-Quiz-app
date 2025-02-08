async function fetchQuestions(category, difficulty, type) {
  const baseUrl = "https://opentdb.com/api.php";

  const queryParams = {};
  if (category) queryParams.category = category;
  if (difficulty) queryParams.difficulty = difficulty;
  if (type) queryParams.type = type;

  queryParams.amount = 5;
  const params = new URLSearchParams(queryParams);

  return fetch(`${baseUrl}?${params.toString()}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.response_code !== 0) {
        throw new Error("No questions available for the selected parameters.");
      }
      return data.results;
    })
    .catch((error) => {
      console.error(`An error ocurred: ${error.message}`);
      throw error;
    });
}
export { fetchQuestions };
