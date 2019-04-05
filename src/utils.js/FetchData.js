let formData = new FormData();
formData.append("api_key", apiKey);
formData.append("language", "en-US");
formData.append("page", "1");
const api = `${movieApi}${configuration.movieCategory.popular}`;
fetch(api, {
  method: "POST",
  body: formData
})
  .then(response => response.json())
  .then(responseJson => {
    const popular = responseJson.results;
    console.log(popular)
    const movieSliders = popular.slice(0, 5);
    this.setState({
      popular,
      movieSliders
    });
  })
  .catch(e => {
    console.log(e);
  });