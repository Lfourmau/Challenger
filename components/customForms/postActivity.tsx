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

export default function PostActivity() {

	const [formData, setFormData] = useState({
		name: "",
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


		const { data, error } = await supabaseClient
		.from('activities')
		.insert([
			{ 
				name: formData.name,	
			},
		])
		.select()
		if (error){
			toast.error('Niktamer')
		} else{
			toast.success('Activity posted')
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
					<SelectItem value="Kywo sport" className="cursor-pointer">Kywo sport</SelectItem>
					<SelectItem value="Kywo e-sport" className="cursor-pointer">Kywo e-sport</SelectItem>
				</SelectContent>
			</Select>
		</div>

        <div className="mt-4">
          <label>Name of the activity</label>
          <Input type="text" name="name" onChange={handleInput} value={formData.name} />
        </div>

        <Button onClick={submitForm} className="mt-3">Post activity</Button>
      </form>
	)
}