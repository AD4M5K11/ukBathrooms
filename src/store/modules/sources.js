import news from "../../api/news";

const state = () => ({
  sources: [],
  selectedSourceId: null,
  sourcesError: null
});

const getters = {
    allSources: state => { return state.sources },
    selectedSource: state => { return state.selectedSourceId },
    sourcesError: state => { return state.sourcesError },
};

const mutations = {
  setSources(state, sources) {
    state.sources = sources;
  },
  setSelectedSource(state, id) {
    state.selectedSourceId = id;
  },
  setSourcesError(state, error) {
    state.sourcesError = error;
  },
};

const actions = {
  async getSourcesData({ commit }) {
    const response = await news.getSources();
    commit("setSources", response.sources);
  },
  updateSelectedSource({ commit }, sourceId) {
    commit("setSelectedSource", sourceId);
  },
  async getSourcesError({ commit }) {
    const response = await news.wrongApiCall();
    commit("setSourcesError", response);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
