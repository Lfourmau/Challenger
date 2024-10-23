"use client";
import { supabaseGame } from "@/lib/supabase_game";
import { supabaseSport } from "@/lib/supabase_sport";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import StatCard from "./statCard";
import { VideosPerActivityChart } from "../charts/videosPerActivityChart";

interface activityStat{
	numberOfVideos:number,
	activity: string,
}

export default function DisplayStats({portal}){
	const [numberOfUsers, setNumberOfUsers] = useState(0)
	const [numberOfVideos, setNumberOfVideos] = useState(0)
	const [validatedChalls, setValidatedChalls] = useState(0)
	const [videosByActivity, setVideosByActivity] = useState<activityStat[]>([])

	useEffect(() => {
		if (!portal){
			return ;
		}
		const supabaseClient = portal === "Kywo sport" ? supabaseSport : supabaseGame
		// Fonction pour récupérer les catégories depuis Supabase
		const fetchStats = async () => {
			// Number of users
			const {error: userError, count:userCount}  = await supabaseClient.from("users").select("*", { count: "exact", head: true })
			if (userError){
				toast.error("Could not fetch the number of users")
			}else{
				setNumberOfUsers(userCount || 0)
			}
			
			// Number of videos
			const {error :videoError, count:videoCount}  = await supabaseClient.from("videos").select("*", { count: "exact", head: true })
			if (videoError){
				toast.error("Could not fetch the number of videos")
			}else{
				setNumberOfVideos(videoCount || 0)
			}

			// Number of videos
			const {error :challsError, count:challsCount}  = await supabaseClient.from("userChallenges").select("*", { count: "exact", head: true })
			if (challsError){
				toast.error("Could not fetch the number of validated challenges")
			}else{
				setValidatedChalls(challsCount || 0)
			}
		};

		const activitiesStats = async () => {
			const supabaseClient = portal === "Kywo sport" ? supabaseSport : supabaseGame
			const {data: activities, error} = await supabaseClient.from("activities").select("*")
			if (error){
				toast.error("Error fetching activities")
			}else{
				activities.forEach(async activity => {
					const {data : activityStat, error: activityError, count} = await supabaseClient.from("videos")
					.select(`challenge:challenges!inner(
							activity:activities!inner(name)
						)`
						, { count: "exact", head: true })
					.eq("challenge.activity.name", activity.name)

					if (activityError){
						toast.error("Error fetching " + activity.name)
					} else{
						setVideosByActivity((prevVideos) => [
							...prevVideos,
							{
							  numberOfVideos: count || 0,
							  activity: activity.name,
							},
						  ]);
					}
				});
			}

			console.log(videosByActivity)
		}

		fetchStats();
		activitiesStats();
	  }, [portal]);

	return (
		portal ? (
			<div className="w-full">
				<div className="w-full flex flex-row gap-4">
					<StatCard title={"Users"} description={"Total amount of users"} data={numberOfUsers} />
					<StatCard title={"Videos"} description={"Total amount of videos"} data={numberOfVideos} />
					<StatCard title={"Validations"} description={"Total amount of validated challenges"} data={validatedChalls} />
					<StatCard title={"Video per user"} description={"Number of videos divided by the number of users"} data={numberOfVideos / numberOfUsers} />
				</div>
				<div className="w-full flex flex-row gap-4 mt-3">
					<VideosPerActivityChart statArray={videosByActivity}/>
				</div>
			</div>
		):(
			<h1>Select a portal to see stats</h1>
		)
	)
}