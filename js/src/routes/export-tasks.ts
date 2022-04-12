import type { RequestHandler } from "@sveltejs/kit";
import { PIPELINE_DATA } from "../lib/interfaces/Types";

export const get: RequestHandler = async () => {
	const tasks = Object.fromEntries(
		Object.entries(PIPELINE_DATA).map(([k, v]) => {
			return [k, {
				type: v.modality,
				subtasks: v.subtasks?.map(sub => sub.type)
			}];
		})
		.sort((a, b) => a[0].toString().localeCompare(b[0].toString()))
		/// ^ remove this line when you don't need tasks.json sorted
	);

	return {
		headers: {
			"content-type": "text/plain",
		},
		body: JSON.stringify(tasks, null, "    "),
	};
};
