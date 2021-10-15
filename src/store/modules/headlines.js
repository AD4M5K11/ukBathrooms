import news from "../../api/news";

const state = () => ({
  news: [],
  history: [],
  articleDetails: null,
  loading: false,
  historyLength: 5
});

const getters = {
  allHeadlines: (state) => {
    return state.news;
  },
  articleDetails: (state) => {
    return state.articleDetails;
  },
  loadingState: (state) => {
    return state.loading;
  },
  historyHeadlines: (state) => {
    return state.history;
  },
};

const mutations = {
  setNews(state, news) {
    state.news = news.map((article) => {
      const options = { year: "numeric", month: "long", day: "numeric" };
      article.publishedAt = new Date(article.publishedAt).toUTCString(
        undefined,
        options
      );
      return article;
    });
    state.loading = false;
  },
  setHeadlineDetails(state, params) {
    const { details, log } = { ...params }
    state.articleDetails = details;
    if (log) {
    const historyLength = state.history.length;
    if (historyLength >= state.historyLength) {
      state.history.shift();
    }
      state.history.push(details);
    }
  },
  setHeadlineTitle(state, params) {
    const { title, index } = { ...params };
    state.news[index].title = title;
  },
  setLoading(state, value) {
    state.loading = value;
  },
};

const actions = {
  async getNewsData({ commit }, source) {
    commit("setLoading", true);
    const newsData = source ? await news.getNews(source) : await news.getNews();
    commit("setNews", newsData);
  },
  async searchNewsData({ commit }, params) {
    const { searchText, source } = { ...params }
    commit("setLoading", true);
    const newsData = await news.searchNews(searchText, source);
    commit("setNews", newsData);
  },
  async getCurrentHeadline({ state, commit, dispatch }, params) {
    const { title, log } = { ...params }
    if (state.news.length < 1) {
      await dispatch("getNewsData");
    }
    const article = state.news.filter((article) => article.title === title)[0];
    commit("setHeadlineDetails", { details: article, log });
  },
  updateHeadlineTitle({ state, commit }, params) {
    for (let index = 0; index < state.news.length; index++) {
      if (state.news[index].title === params.currentTitle) {
        commit("setHeadlineTitle", {
          title: params.newTitle,
          index,
        });
        break;
      }
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
