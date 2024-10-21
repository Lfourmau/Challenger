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

export function EditVideo({video, portal}) {

	const [formData, setFormData] = useState({
		author: video.author.username,
		challTitle: video.challenge.title,
		views: video.views,
		claps: video.claps,
		status: video.video_status,
		thumbnail: video.thumbnail_image,
		url : video.url,
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


	async function editVideo(){
		const supabaseClient = portal === "Kywo sport" ? supabaseSport : supabaseGame
		const {data, error} = await supabaseClient
		.from("videos")
		.update({
			url: formData.url,
			thumbnail_image: formData.thumbnail,
			video_status :formData.status,
			views :formData.views,
			claps : formData.claps,
		})
		.eq("id", video.id)

		if (error){
			toast.error("Failed to edit : " + error)
		} else {
			toast.success("Video edited !")
		}
	}

	async function deleteVideo(){
		const supabaseClient = portal === "Kywo sport" ? supabaseSport : supabaseGame
		const { error } = await supabaseClient
		.from('videos')
		.delete()
		.eq('id', video.id)

		if (error){
			toast.error("Failed to delete video : " + error)
		} else {
			toast.success("Video deleted !")
		}
	}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{formData.author + "'s video"}</DialogTitle>
          <DialogDescription>
            Edition module.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="thumbnail">
              Thumbnail url
            </Label>
            <Input
			onChange={handleInput}
			value={formData.thumbnail}
			id="thumbnail"
			name="thumbnail"
			
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="url">
              Video url
            </Label>
            <Input
			onChange={handleInput}
			value={formData.url}
			id="url"
			name="url"
			
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="status">
              Video status
            </Label>
            <Input
			onChange={handleInput}
			value={formData.status}
			id="status"
			name="status"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="views">
              Views
            </Label>
            <Input
			onChange={handleInput}
			value={formData.views}
              id="views"
              name='views'
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="claps">
              Claps
            </Label>
            <Input
			onChange={handleInput}
			value={formData.claps}
              id="claps"
              name='claps'
            />
          </div>
        </div>
        {/* <div className="flex items-center space-x-2">
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
        </div> */}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">
              Close
            </Button>
          </DialogClose>
		  <Button type="button" variant="secondary" onClick={editVideo}>
              Edit video
            </Button>
			<Button type="button" variant="destructive" onClick={deleteVideo}>
              Delete the video
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
