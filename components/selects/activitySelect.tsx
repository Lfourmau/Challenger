import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabaseSport } from "@/lib/supabase_sport";
import { supabaseGame } from "@/lib/supabase_game";
import { useEffect, useState } from "react";

interface Activity{
	id :number,
	name:string,
}

export default function ActivitySelect({ onActivityChange, disabled, portal }){

	const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
	const supabaseClient = portal === "Kywo sport" ? supabaseSport : supabaseGame
    // Fonction pour récupérer les catégories depuis Supabase
    const fetchActivities = async () => {
      try {
        const { data, error } = await supabaseClient
          .from("sports")
          .select("*");

        if (error) {
          console.error("Error fetching categories:", error);
        } else {
          setActivities(data);
		  console.log(portal)
		  console.log(data)
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    // Appel de la fonction pour récupérer les catégories au chargement
    fetchActivities();
  }, [portal]);

	return (
	<Select onValueChange={onActivityChange} disabled={disabled}>
		<SelectTrigger>
			<SelectValue placeholder="Undefined" />
		</SelectTrigger>
		<SelectContent>
				{activities.map((activity) => (
				<SelectItem key={activity.id} value={activity.id.toString()}>
					{activity.name}
				</SelectItem>
				))}
      	</SelectContent>
	</Select>
	)
}