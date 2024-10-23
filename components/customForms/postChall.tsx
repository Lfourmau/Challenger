"use client"; 
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { supabaseSport } from "@/lib/supabase_sport";
import { supabaseGame } from "@/lib/supabase_game";
import CategorySelect from "../selects/categorySelect";
import ActivitySelect from "../selects/activitySelect";
import langagesKeys from "@/app/langs/langs";


export default function PostChall() {
	const authKey = process.env.NEXT_PUBLIC_DEEPL_API_KEY || "";

	const translateText = async (text, targetLanguage) => {
		try {
			const response = await fetch('https://api-free.deepl.com/v2/translate', {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			  },
			  body: new URLSearchParams({
				auth_key: authKey,
				text: text,
				target_lang: targetLanguage,
			  }),
			});
		
			const result = await response.json();
		
			if (response.ok) {
			  return result.translations[0].text; // Retourne le texte traduit
			} else {
			  throw new Error(result.message);
			}
		  } catch (error) {
			console.error("Error calling DeepL API:", error);
			return null;
		  }
	};



	const [formData, setFormData] = useState({
		title: "",
		description: "",
		points :0,
		votes_needed :0,
		portal : "",
		activity :"",
		difficulty :"",
		category :"",
		hidden :false,
	});

	const handleInput = (e) => {
		const fieldName = e.target.name;
		const fieldValue = e.target.value;
	  
		setFormData((prevState) => ({
		  ...prevState,
		  [fieldName]: fieldValue
		}));
	  }

	  const handleDifficultyChange = (newDifficulty) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			difficulty: newDifficulty,
		}));
	};
	  const handleActivityChange = (newActivity) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			activity: newActivity,
		}));
	};
	  const handleCategoryChange = (newCategory) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			category: newCategory,
		}));
	};
	  const handlePortalChange = (newPortal) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			portal: newPortal,
		}));
	};
	  const handleHiddenChange = (newHidden) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			hidden: newHidden,
		}));
	};
	const handleVotesNeededChange = (e) => {
		const { value } = e.target; // Récupérer la valeur entrée par l'utilisateur
		setFormData((prevFormData) => ({
			...prevFormData,
			votes_needed: Number(value), // Convertir la valeur en nombre
		}));
	};
	const handlePointsChange = (e) => {
		const { value } = e.target; // Récupérer la valeur entrée par l'utilisateur
		setFormData((prevFormData) => ({
			...prevFormData,
			points: Number(value), // Convertir la valeur en nombre
		}));
	};


	  const submitForm = async (e) => {
		const supabaseClient = formData.portal === "Kywo sport" ? supabaseSport : supabaseGame

		// We don't want the page to refresh
		e.preventDefault()


		const { data, error } = await supabaseClient
		.from('challenges')
		.insert([
			{ 
				title: formData.title,	
				description: formData.description,
				points: formData.points,
				difficulty: formData.difficulty,
				activityId: formData.activity,
				categoryId: formData.category,
				votes_needed: formData.votes_needed,
				hidden: formData.hidden 
			},
		])
		.select()
		if (error){
			toast.error('Niktamer')
		} else{
			const challengeId = data[0].id;
			toast.success('Challenge posted')
			langagesKeys.forEach(async key => {
				const translatedTitle = await translateText(formData.title, key)
				const translatedDescription = await translateText(formData.description, key)
				const { error: translationError } = await supabaseClient
				.from('challenges_translations')
				.insert([{
					challengeId : challengeId,
					language_code : key,
					title : translatedTitle,
					description : translatedDescription
				}])
				if (translationError){
					toast.error('Error translating in ' + key)
				}
			});
			await translateText("This is a try of traduction feature", "fr")
		}
		console.log(formData)
	  }

	return (
		<form onSubmit={submitForm} className="w-full">
        <div className="mt-4">
          <label>Title</label>
          <Input type="text" name="title" onChange={handleInput} value={formData.title} />
        </div>

        <div className="mt-4">
          <label>Description</label>
          <Input type="text" name="description" onChange={handleInput} value={formData.description} />
        </div>

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

        <div className="mt-4">
			<label>Activity</label>
			<ActivitySelect onActivityChange={handleActivityChange} disabled={!formData.portal} portal={formData.portal}/>
		</div>
        <div className="mt-4">
			<label>Difficulty</label>
			<Select onValueChange={handleDifficultyChange}>
				<SelectTrigger>
					<SelectValue placeholder="Select one" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="Easy">Easy</SelectItem>
					<SelectItem value="Medium">Medium</SelectItem>
					<SelectItem value="Hard">Hard</SelectItem>
				</SelectContent>
			</Select>
		</div>
        <div className="mt-4">
			<label>Category</label>
			<CategorySelect onCategoryChange={handleCategoryChange} disabled={!formData.portal || !formData.activity} portal={formData.portal} activity={formData.activity}/>
		</div>

		<div className="mt-4">
          <label>Points</label>
          <Input type="number" name="points" onChange={handlePointsChange} value={formData.points} />
        </div>
		<div className="mt-4">
          <label>Votes needed</label>
          <Input type="number" name="points" onChange={handleVotesNeededChange} value={formData.votes_needed} />
        </div>

		<div className="mt-4">
			<label>Hidden</label>
			<Select onValueChange={handleHiddenChange}>
				<SelectTrigger>
					<SelectValue placeholder="False" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="True">True</SelectItem>
				</SelectContent>
			</Select>
		</div>

        <Button onClick={submitForm} className="mt-3">Post challenge</Button>
      </form>
	)
}