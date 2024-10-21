import { Challenge } from "./challenge";
import { User } from "./user";

export interface Video{
	id: number,
	author: User,
	challenge:Challenge,
	claps: number,
	views: number,
	video_status : string,
	approvals: number,
	denials : number,
	url: string,
	posted_at: string,
	thumbnail_image : string,
}