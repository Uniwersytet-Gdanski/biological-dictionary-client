import actionCreator from "../../../utils/actionCreator";
import {
	ENTRIES_ADD_ONE,
	ENTRIES_ADD_MANY,
} from "./types.js";

export const addMovie = (newMovie) => (actionCreator(ENTRIES_ADD_ONE, newMovie));

export const addMovies = (newMovies) => (actionCreator(ENTRIES_ADD_MANY, newMovies));
