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
import { User } from "@/app/types/user";
import { EditUser } from "../dialogs/editUser";



export default function ListUsers(){
	const [users, setUsers] = useState<User[]>([])
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






	useEffect(() => {
		if (!formData.portal){
			return ;
		}
		const supabaseClient = formData.portal === "Kywo sport" ? supabaseSport : supabaseGame
		// Fonction pour récupérer les catégories depuis Supabase
		const fetchUsers = async () => {
		  const {data, error} = await supabaseClient
		  .from("users")
		  .select(`
				*
			`)
		console.log(data)
		if (error){
			toast.error("Failed to fetch users : " + error)
		} else if (data.length === 0){
			toast.error("No user found")
		} else{
			setUsers(data)
			toast.success(data.length + " user(s) fetched !")
		}
		};
	
		// Appel de la fonction pour récupérer les catégories au chargement
		fetchUsers();
	  }, [formData.portal, lang]);





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

			</form>

			<Table className="mt-5">
				<TableCaption>Users administration</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Id</TableHead>
						<TableHead>Username</TableHead>
						<TableHead>Country</TableHead>
						<TableHead>City</TableHead>
						<TableHead>Followers</TableHead>
						<TableHead>OnBoarded</TableHead>
						<TableHead>Email</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((item) => (
						<TableRow key={item.id} className="cursor-pointer">
							<TableCell className="font-medium">{item.id}</TableCell>
							<TableCell>{item.username}</TableCell>
							<TableCell>{item.country}</TableCell>
							<TableCell>{item.city}</TableCell>
							<TableCell>{item.followers}</TableCell>
							<TableCell>{item.onboarded.toString()}</TableCell>
							<TableCell>{item.email}</TableCell>
							<TableCell>
								<EditUser user={item} portal={formData.portal}></EditUser>
							</TableCell>
						</TableRow>
					))
					}
				</TableBody>
			</Table>
		</div>
	)
}