let newsData = [];
let newsSources = [];
const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;

export default {
  async getNews(source = null) {
    const sourceParam = source ? "sources=" + source : "country=uk";

    const response = await fetch(
      "https://newsapi.org/v2/top-headlines?" +
        sourceParam +
        "&apiKey=" +
        newsApiKey
    );
    newsData = await response.json();
    return newsData?.articles;
  },

  async searchNews(searchText, source = null) {
    const searchSource = source ? "sources=" + source : "country=uk";

    if (searchText) {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?${searchSource}&q=${searchText}&apiKey=${newsApiKey}`
      );
      newsData = await response.json();
      return newsData?.articles;
    } else {
      return this.getNews(source);
    }
  },

  async getSources() {
    const response = await fetch(
      "https://newsapi.org/v2/sources?apiKey=" + newsApiKey
    );
    newsSources = await response.json();
    return newsSources;
  },

  async wrongApiCall() {
    let error = null;
    await fetch("https://newsapi.org/v2/sources?apiKey").then((response) => {
      error = response.json();
    });
    return error;
  },
};
