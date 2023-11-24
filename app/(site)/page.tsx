import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItems from "@/components/ListItems";
import PageContent from "./components/PageContent";


export const revalidate = 0;

export default async function Home() {



  const songs = await getSongs();
  
 
  return (
    <div className="bg-neutral-900 w-full h-full overflow-hidden overflow-y-auto rounded-lg">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Welcome back</h1>

          <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          xl:grid-cols-3
          2xl:grid-cols-4
          mt-4
          "
          >
            <ListItems
              image="/images/liked.png"
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      </Header>

      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            Newest songs
          </h1>
        </div>

        <PageContent 
         songs={songs}
        />
      </div>
    </div>
  )
}
