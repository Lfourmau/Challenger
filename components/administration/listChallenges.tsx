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
import { Challenge } from "@/app/types/challenge";
import langagesKeys from "@/app/langs/langs";



export default function ListChallenges(){
	const [challs, setChalls] = useState<Challenge[]>([])
	const [lang, setLang] = useState("en")

	const [formData, setFormData] = useState({
		category: "",
		activity: "",
		portal: "",
	});

	const handleCategoryChange = (newCategory) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			category: newCategory,
		}));
	};

	  const handleActivityChange = (newActivity) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			activity: newActivity,
		}));
	};
	const handlePortalChange = (newPortal) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			portal: newPortal,
		}));
	};
	const handleLanguageChange = (newLang) => {
		setLang(newLang)
	};




	// challenge:challenges (
	// 	translation:challenges_translations(
	// 	  title,
	// 	  description,
	// 	  language_code
	// 	),
	// 	id,
	// 	title,
	// 	description,
	// 	votes_needed,
	// 	points,
	// 	activity:activities (
	// 	  id,
	// 	  name
	// 	)
	//   ),

	useEffect(() => {
		if (!formData.activity || !formData.category || !formData.portal){
			return ;
		}
		const supabaseClient = formData.portal === "Kywo sport" ? supabaseSport : supabaseGame
		// Fonction pour récupérer les catégories depuis Supabase
		const fetchChalls = async () => {
		  const {data, error} = await supabaseClient
		  .from("challenges")
		  .select(`
				*,
				translation:challenges_translations(
					title,
					description,
					language_code
					)
			`)
		.eq("translation.language_code", lang)
		  .eq("activityId", formData.activity)
		  .eq("categoryId", formData.category)
			console.log(data)
			if (error){
				console.log(error)
				toast.error("Failed to fetch challs : " + error)
			} else if (data.length === 0){
				toast.error("No challenge found")
			} else{
				setChalls(data)
				toast.success(data.length + " challenge(s) fetched !")
			}
		};
	
		// Appel de la fonction pour récupérer les catégories au chargement
		fetchChalls();
	  }, [formData.activity, formData.category, formData.portal, lang]);





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
							<SelectItem value="Kywo sport" className="cursor-pointer">Kywo sport</SelectItem>
							<SelectItem value="Kywo e-sport" className="cursor-pointer">Kywo e-sport</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="mt-4">
					<label>Activity</label>
					<ActivitySelect onActivityChange={handleActivityChange} disabled={!formData.portal} portal={formData.portal}/>
				</div>
				<div className="mt-4">
					<label>Name of the category</label>
					<CategorySelect onCategoryChange={handleCategoryChange} disabled={!formData.portal || !formData.activity} portal={formData.portal} activity={formData.activity}/>
				</div>

				<div className="mt-4">
					<label>Language</label>
					<Select onValueChange={handleLanguageChange}>
						<SelectTrigger>
							<SelectValue placeholder="Select language" defaultValue={"en"} />
						</SelectTrigger>
						<SelectContent>
						{
							langagesKeys.map((key) => (
								<SelectItem key={key} value={key}>{key}</SelectItem>
							))
						}
						</SelectContent>
					</Select>
				</div>
			</form>

			<Table className="mt-5">
				<TableCaption>Challenges administration</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[20px]">Id</TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Description</TableHead>
						<TableHead className="">Votes_needed</TableHead>
						<TableHead className="">Activity</TableHead>
						<TableHead className="">Category</TableHead>
						<TableHead className="">Hidden</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{challs.map((item) => (
						<TableRow key={item.id} className="cursor-pointer">
							<TableCell className="font-medium">{item.id}</TableCell>
							<TableCell>{item.translation[0].title}</TableCell>
							<TableCell>{item.translation[0].description}</TableCell>
							<TableCell>{item.votes_needed}</TableCell>
							<TableCell>{item.activityId}</TableCell>
							<TableCell>{item.categoryId}</TableCell>
							{/* <TableCell>{item.hidden.toString()}</TableCell> */}
							<TableCell>
								<EditChallenge chall={item} portal={formData.portal}></EditChallenge>
							</TableCell>
						</TableRow>
					))
					}
				</TableBody>
			</Table>
		</div>
	)
}