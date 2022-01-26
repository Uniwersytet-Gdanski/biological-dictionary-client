import * as yup from 'yup';

const termSchema = yup.object().shape({
	names: yup.array().of(yup.string().required()).required().min(1).transform((value) => 
		value.map((name) => name.trim().replace(/\s+/g, ' ')).filter((name) => name.length > 0)
	),
	definition: yup.string().required(),
	englishTranslations: yup.array().of(yup.object().shape({
		singular: yup.string().nullable().transform((value) => {
			if (value === "" || value === null || value.trim() === "") return null;
			return value.trim().replace(/\s+/g, ' ');
		}),
		plural: yup.string().nullable().transform((value) => {
			if (value === "" || value === null || value.trim() === "") return null;
			return value.trim().replace(/\s+/g, ' ');
		}),
	})).required().min(1).transform((value) => {
		return value.filter((translation) => {
			if ((translation.singular === null || translation.singular === "" || translation.singular.trim() === "") 
				&& (translation.plural === null || translation.plural === "" || translation.plural.trim() === "")) 
				return false;
			return true;
		});
	}),
});

export default termSchema;
