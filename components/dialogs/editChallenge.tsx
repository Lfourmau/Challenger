import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect, useState } from "react"
import CategorySelect from "../selects/categorySelect"
import ActivitySelect from "../selects/activitySelect"
import { supabaseSport } from "@/lib/supabase_sport"
import { supabaseGame } from "@/lib/supabase_game"
import toast from "react-hot-toast"

export function EditChallenge({chall, portal}) {

	const [formData, setFormData] = useState({
		title: chall.title,
		description: chall.description,
		points :chall.points,
		votes_needed :chall.votes_needed,
		activityId : chall.activityId,
		difficulty :chall.difficulty,
		categoryId : chall.categoryId,
		hidden : chall.hidden,
	});

	useEffect(() => {
	  }, [formData]);

	const handleInput = (e) => {
		const fieldName = e.target.name;
		const fieldValue = e.target.value;
	  
		setFormData((prevState) => ({
		  ...prevState,
		  [fieldName]: fieldValue
		}));
	  }

	const handleCategoryChange = (newCategory) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			categoryId: newCategory,
		}));
	};

	const handleActivityChange = (newActivity) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			activityId: newActivity,
		}));
	};


	async function editChall(){
		const supabaseClient = portal === "Kywo sport" ? supabaseSport : supabaseGame
		const {data, error} = await supabaseClient
		.from("challenges")
		.update({
			title: formData.title,
			description: formData.description,
			points :formData.points,
			votes_needed :formData.votes_needed,
			activityId : formData.activityId,
			difficulty :formData.difficulty,
			categoryId : formData.categoryId,
			hidden : formData.hidden,
		})
		.eq("id", chall.id)

		if (error){
			toast.error("Failed to edit : " + error)
		} else {
			toast.success("Chall edited !")
		}
	}

	async function deleteChall(){
		const supabaseClient = portal === "Kywo sport" ? supabaseSport : supabaseGame
		const { error } = await supabaseClient
		.from('challenges')
		.delete()
		.eq('id', chall.id)

		if (error){
			toast.error("Failed to delete challenge : " + error)
		} else {
			toast.success("Challenge deleted !")
		}
	}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{formData.title}</DialogTitle>
          <DialogDescription>
            Edition module.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="title">
              Title
            </Label>
            <Input
			onChange={handleInput}
			value={formData.title}
			id="title"
			name="title"
			
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="description">
              Description
            </Label>
            <Input
			onChange={handleInput}
			value={formData.description}
			id="description"
			name="description"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="points">
              Points
            </Label>
            <Input
			onChange={handleInput}
			value={formData.points}
              id="points"
              name='points'
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="votes_needed">
              Votes needed
            </Label>
            <Input
			onChange={handleInput}
			value={formData.votes_needed}
              id="votes_needed"
              name='votes_needed'
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="difficulty">
              Difficulty
            </Label>
            <Input
			onChange={handleInput}
			value={formData.difficulty}
            id="difficulty"
            name="difficulty"
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="hidden">
              Hidden
            </Label>
            <Input
			onChange={handleInput}
			value={formData.hidden}
            id="hidden"
            name="hidden"
            />
          </div>
        </div>
		<div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="activityId">
              Activity
            </Label>
            <ActivitySelect onActivityChange={handleActivityChange} disabled={false} portal={portal}/>
          </div>
        </div>
		<div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="categoryId">
              Category
            </Label>
            <CategorySelect onCategoryChange={handleCategoryChange} disabled={false} portal={portal} activity={formData.activityId}/>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">
              Close
            </Button>
          </DialogClose>
		  <Button type="button" variant="secondary" onClick={editChall}>
              Edit challenge
            </Button>
			<Button type="button" variant="destructive" onClick={deleteChall}>
              Delete the challenge
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
