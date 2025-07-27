'use client'
import { Button } from "@/components/ui/button"
import { deletePeople } from "@/features/people/service"
import { Trash2 } from "lucide-react"

export  const DeleteButton = ({id}:{id:number})=>{
    return  <Button variant="destructive" className="hover:pointer" size="icon" 
                onClick={async()=>{
                    try {
                      await deletePeople(id)
                    alert("Succesfully deleted")
                    } catch (error) {
                        console.log(error)
                    }
                }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
}