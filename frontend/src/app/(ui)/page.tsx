
import { getApis } from "@/apiServices";
import { RecentPageContent } from "./recent/RecentPageContent";
import { getCacheOptions } from "@/features/cacheOption";
import { auth } from "@/auth";
import { LoginPage } from "@/components/LoginPage";

export default async function Home() {
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
  return <RecentPageContent projectData={projectData}/>;

  }else{
  return <LoginPage />;

  }

}
