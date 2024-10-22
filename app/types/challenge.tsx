import Translation from "./translation";

export interface Challenge{
	id: number,
	title: string,
	description: string,
	points :number,
	votes_needed :number,
	activityId :number,
	difficulty :string,
	categoryId :number,
	hidden :boolean,
	translation : Translation
}