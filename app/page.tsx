import Home from "./home/page";

export default function App() {
  
  const id = process.env.SPOTIFY_CLIENT_ID 
  const secret = process.env.SPOTIFY_CLIENT_SECRET

  if(!secret || !id){
    return(
      <div>
        No env
      </div>
    )
  }
  return (
    <>
      <main className="bg-black text-white h-screen w-full p-16">
        <Home />
      </main>
    </>
  );
}
