export const movieApi = "https://api.themoviedb.org/3/movie/";
export const searchApi = "https://api.themoviedb.org/3/search/movie";
export const apiKey = "777fb168a8f7e984ad64886102a37ad3";
export const configuration = {
  movieCategory: {
    popular: "popular",
    nowPlaying: "now_playing",
    topRated: "top_rated",
    upcoming: "upcoming",
    latest: "latest"
  }
};
export const categories = [
  {
    title: "Now playing",
    url: "now_playing",
    isLoading: true,
    data: []
  },
  {
    title: "Upcoming",
    url: "upcoming",
    isLoading: true,
    data: []
  },
  {
    title: "Popular",
    url: "popular",
    isLoading: true,
    data: []
  },
  {
    title: "Top rated",
    url: "top_rated",
    isLoading: true,
    data: []
  }
];
