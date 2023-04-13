import { TabContainer } from "./components/Tab"


export default function LoginPage() {
  return (
    <main className='flex flex-col h-screen max-w-xl mx-auto justify-center items-center'>

      <h1 className="font-medium text-3xl text-center">
        Junte-se ao Prive
        <pre />
        Administre a Lista Vip do seu Evento
      </h1>

      <div className="flex flex-col w-[75%] mt-12">
        <TabContainer />
      </div>
    </main>
  )
}