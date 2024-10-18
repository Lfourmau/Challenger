import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabaseSport } from "@/lib/supabase_sport";
import { supabaseGame } from "@/lib/supabase_game";
import { useEffect, useState } from "react";

interface Category{
	id:number,
	name: string,
	sportId : number,
}

export default function CategorySelect({ onCategoryChange, disabled, portal, activity }){
	const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
	const supabaseClient = portal === "Kywo sport" ? supabaseSport : supabaseGame
    // Fonction pour récupérer les catégories depuis Supabase
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("categories")
			.select(`
			id,
			name,
			sportId
			`)
			.eq("sportId", activity);

        if (error) {
          console.error("Error fetching categories:", error);
        } else {
			console.log(activity)
          setCategories(data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    // Appel de la fonction pour récupérer les catégories au chargement
    fetchCategories();
  }, [activity, portal]);
  
	return (
		<Select onValueChange={onCategoryChange} disabled={disabled}>
			<SelectTrigger>
				<SelectValue placeholder="Undefined" />
			</SelectTrigger>
			<SelectContent>
				{categories.map((category) => (
				<SelectItem key={category.id} value={category.id.toString()}>
					{category.name}
				</SelectItem>
				))}
      		</SelectContent>
		</Select>
	)
}