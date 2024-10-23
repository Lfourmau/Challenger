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

export function EditUser({user, portal}) {

	const [formData, setFormData] = useState({
		id: user.id,
		username: user.username,
		country :user.country,
		city :user.city,
		followers : user.followers,
		onboarded :user.onboarded,
		email : user.email,
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


	async function editUser(){
		const supabaseClient = portal === "Kywo sport" ? supabaseSport : supabaseGame
		const {data, error} = await supabaseClient
		.from("users")
		.update({
			username: formData.username.toLowerCase(),
			country :formData.country,
			city :formData.city,
			followers : formData.followers,
			onboarded :formData.onboarded,
			email : formData.email,
		})
		.eq("id", user.id)

		if (error){
			toast.error("Failed to edit : " + error)
		} else {
			toast.success("User edited !")
		}
	}

	async function deleteUser(){
		const supabaseClient = portal === "Kywo sport" ? supabaseSport : supabaseGame
		const { error } = await supabaseClient
		.from('users')
		.delete()
		.eq('id', user.id)

		if (error){
			toast.error("Failed to delete user : " + error)
		} else {
			toast.success("User deleted !")
		}
	}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{formData.username}</DialogTitle>
          <DialogDescription>
            Edition module.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="username">
              User
            </Label>
            <Input
			onChange={handleInput}
			value={formData.username}
			id="username"
			name="username"
			
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="email">
              Email
            </Label>
            <Input
			onChange={handleInput}
			value={formData.email}
			id="email"
			name="description"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="followers">
              Followers
            </Label>
            <Input
			onChange={handleInput}
			value={formData.followers}
              id="followers"
              name='followers'
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="onboarded">
              Onboarded
            </Label>
            <Input
			onChange={handleInput}
			value={formData.onboarded}
            id="onboarded"
            name="onboarded"
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="country">
              Country
            </Label>
            <Input
			onChange={handleInput}
			value={formData.country}
            id="country"
            name="country"
            />
          </div>
          <div className="grid flex-1 gap-2">
            <Label htmlFor="city">
              City
            </Label>
            <Input
			onChange={handleInput}
			value={formData.city}
            id="city"
            name="city"
            />
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">
              Close
            </Button>
          </DialogClose>
		  <Button type="button" variant="secondary" onClick={editUser}>
              Edit user
            </Button>
			<Button type="button" variant="destructive" onClick={deleteUser}>
              Delete the user
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
