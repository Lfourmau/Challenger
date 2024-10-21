"use client"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import ActivitySelect from "../selects/activitySelect";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import CategorySelect from "../selects/categorySelect";
import { supabaseSport } from "@/lib/supabase_sport";
import { supabaseGame } from "@/lib/supabase_game";
import toast from "react-hot-toast";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
  } from "@/components/ui/table"
import { EditChallenge } from "../dialogs/editChallenge";
import { Video } from "@/app/types/video";
import { EditVideo } from "../dialogs/editVideo";



export default function ListVideos(){
	const [videos, setVideos] = useState<Video[]>([])

	const [formData, setFormData] = useState({
		portal : "",
	});

	const handlePortalChange = (newPortal) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			portal: newPortal,
		}));
	};






	useEffect(() => {
		if (!formData.portal){
			return ;
		}
		const supabaseClient = formData.portal === "Kywo sport" ? supabaseSport : supabaseGame
		// Fonction pour récupérer les catégories depuis Supabase
		const fetchVideos = async () => {
		  const {data, error} = await supabaseClient.from("videos")
		  .select(`
			*,
			challenge:challenges(
				*
			),
			author:users(
				*
			)
		`)
		if (error){
			toast.error("Failed to fetch videos : " + error)
		} else if (data.length === 0){
			toast.error("No video found")
		} else{
			setVideos(data)
			toast.success(data.length + " video(s) fetched !")
		}
		};
	
		// Appel de la fonction pour récupérer les catégories au chargement
		fetchVideos();
	  }, [formData.portal]);





	return (
		<div className="w-full">
			<form className="w-full">
				<div className="mt-4">
					<label>Portal</label>
					<Select onValueChange={handlePortalChange}>
						<SelectTrigger>
							<SelectValue placeholder="Select portal" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Kywo sport">Kywo sport</SelectItem>
							<SelectItem value="Kywo e-sport">Kywo e-sport</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</form>

			<Table className="mt-5">
				<TableCaption>Challenges fetched</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[20px]">Id</TableHead>
						<TableHead>Author</TableHead>
						<TableHead className="">ChallTitle</TableHead>
						<TableHead className="">Views</TableHead>
						<TableHead className="">Claps</TableHead>
						<TableHead className="">Posted</TableHead>
						<TableHead className="">Status</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{videos.map((item) => (
						<TableRow key={item.id} className="cursor-pointer">
							<TableCell className="font-medium">{item.id}</TableCell>
							<TableCell>{item.author.username}</TableCell>
							<TableCell>{item.challenge.title}</TableCell>
							<TableCell>{item.views}</TableCell>
							<TableCell>{item.claps}</TableCell>
							<TableCell>{item.posted_at}</TableCell>
							<TableCell>{item.video_status}</TableCell>
							<TableCell>
								<EditVideo video={item} portal={formData.portal}></EditVideo>
							</TableCell>
						</TableRow>
					))
					}
				</TableBody>
			</Table>
		</div>
	)
}

// id: number,
// 	title: string,
// 	description: string,
// 	points :number,
// 	votes_needed :number,
// 	portal : string,
// 	activityId :number,
// 	difficulty :string,
// 	categoryId :number,
// 	hidden :boolean,