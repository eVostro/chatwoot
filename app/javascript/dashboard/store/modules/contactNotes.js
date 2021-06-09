import * as types from '../mutation-types';
import Vue from 'vue';
import ContactNotesAPI from '../../api/contactNotes';

export const state = {
  records: {},
  uiFlags: {
    isFetching: false,
    isCreating: false,
    isDeleting: false,
  },
};

export const getters = {
  getAllNotesByContact: _state => contactId => {
    return _state.records[contactId] || [];
  },
  getUIFlags(_state) {
    return _state.uiFlags;
  },
};

export const actions = {
  async get({ commit }, { contactId }) {
    commit(types.default.SET_CONTACT_NOTES_UI_FLAG, {
      isFetching: true,
    });
    try {
      const { data } = await ContactNotesAPI.get(contactId);
      commit(types.default.SET_CONTACT_NOTES, { contactId, data });
    } catch (error) {
      throw new Error(error);
    } finally {
      commit(types.default.SET_CONTACT_NOTES_UI_FLAG, {
        isFetching: false,
      });
    }
  },

  async create({ commit }, { contactId, content }) {
    commit(types.default.SET_CONTACT_NOTES_UI_FLAG, {
      isCreating: true,
    });
    try {
      const { data } = await ContactNotesAPI.create({
        content,
        contactId,
      });
      commit(types.default.ADD_CONTACT_NOTE, {
        contactId,
        data,
      });
    } catch (error) {
      throw new Error(error);
    } finally {
      commit(types.default.SET_CONTACT_NOTES_UI_FLAG, {
        isCreating: false,
      });
    }
  },

  async delete({ commit }, { noteId, contactId }) {
    commit(types.default.SET_CONTACT_NOTES_UI_FLAG, {
      isDeleting: true,
    });
    try {
      await ContactNotesAPI.delete(contactId, noteId);
      commit(types.default.DELETE_CONTACT_NOTE, { contactId, noteId });
    } catch (error) {
      throw new Error(error);
    } finally {
      commit(types.default.SET_CONTACT_NOTES_UI_FLAG, {
        isDeleting: false,
      });
    }
  },
};

export const mutations = {
  [types.default.SET_CONTACT_NOTES_UI_FLAG](_state, data) {
    _state.uiFlags = {
      ..._state.uiFlags,
      ...data,
    };
  },

  [types.default.SET_CONTACT_NOTES]($state, { data, contactId }) {
    Vue.set($state.records, contactId, data);
  },
  [types.default.ADD_CONTACT_NOTE]($state, { data, contactId }) {
    const conatctNotes = $state.records[contactId] || [];
    $state.records[contactId] = [...conatctNotes, data];
  },
  [types.default.DELETE_CONTACT_NOTE]($state, { noteId, contactId }) {
    const conatctNotes = $state.records[contactId];
    const withoutDeletedNote = conatctNotes.filter(note => note.id !== noteId);
    $state.records[contactId] = [...withoutDeletedNote];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};