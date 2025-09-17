

import { AllProjectsPageContent } from "./AllProjectsPageContent";


import { getApis } from "@/apiServices";
import { getCacheOptions } from "@/features/cacheOption";
import { auth } from "@/auth";

export default async function AllProjectsPage() {
  const session =await auth() 
  if(session){
    const { projectApi } = await getApis();
    const res = await projectApi.getAllProjectsV1ProjectGet({
      fetchOptions: {
        next: {
          ...(await getCacheOptions("project")),
          cache: "force-cache",
        },
      },
    });
    const projectData = res.data;

    console.log(projectData)
  return <AllProjectsPageContent projectData={projectData}/>;

  }else{
  return <h2>Please Login In </h2>;

  }

}
