import { ADD_TO_PLAYLIST, MAKE_FAVOURITE, REMOVE_FAVOURITE, SET_PLAY_NOW, PLAY_NEXT_SONG, PLAY_PREV_SONG, REPLACE_PLAYLIST } from "./constants";

export const setPlayNow = (song_obj) => {
    return {
        type: SET_PLAY_NOW,
        payload: song_obj
    }
}

export const makeFavourite = (song_obj) => {
    return {
        type: MAKE_FAVOURITE,
        payload: song_obj
    }
}

export const removeFavourite = (song_id) => {
    return {
        type: REMOVE_FAVOURITE,
        payload: { id: song_id }
    }
}

export const addToPlaylist = (song_obj) => {
    return {
        type: ADD_TO_PLAYLIST,
        payload: song_obj
    }
}

export const playNextSong = () => {
    return {
        type: PLAY_NEXT_SONG
    }
}

export const playPreviousSong = () => {
    return {
        type: PLAY_PREV_SONG
    }
}

export const replacePlaylist = (song_list) => {
    return {
        type: REPLACE_PLAYLIST,
        payload: song_list
    }
}