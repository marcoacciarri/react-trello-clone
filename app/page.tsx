import Board from '@/components/Board'
import Header from '@/components/Header'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Trello clone + GPT summary</h1>
      <Header />
      <Board />
    </main>
  )
}
