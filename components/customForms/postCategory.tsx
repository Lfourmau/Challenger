"use client"; 
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { supabaseSport } from "@/lib/supabase_sport";
import { supabaseGame } from "@/lib/supabase_game";
import CategorySelect from "../selects/categorySelect";
import ActivitySelect from "../selects/activitySelect";
export default function PostCategory() {

	const [formData, setFormData] = useState({
		name: "",
		activity: "",
		portal: "",
	});

	const handleInput = (e) => {
		const fieldName = e.target.name;
		const fieldValue = e.target.value;
	  
		setFormData((prevState) => ({
		  ...prevState,
		  [fieldName]: fieldValue
		}));
	  }

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



	  const submitForm = async (e) => {
		const supabaseClient = formData.portal === "Kywo sport" ? supabaseSport : supabaseGame

		// We don't want the page to refresh
		e.preventDefault()

		const categoriesToInsert = formData.name.split(" ").map((categoryName) => ({
			name: categoryName,
			activityId: formData.activity,  // Utiliser le même activityId pour toutes les catégories
		  }));

		const { data, error } = await supabaseClient
		.from('categories')
		.insert(categoriesToInsert)
		.select()
		if (error){
			toast.error('Niktamer')
		} else{
			toast.success('Category posted')
		}
		console.log(formData)
	  }

	return (
		<form onSubmit={submitForm} className="w-full">
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
          <label>Name of the category</label>
          <Input type="text" name="name" onChange={handleInput} value={formData.name} placeholder="Just separate them with a space if you want to add several."/>
        </div>

        <Button onClick={submitForm} className="mt-3 bg-blue-700">Post category</Button>
      </form>
	)
}