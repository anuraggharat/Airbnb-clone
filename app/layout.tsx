
import ClientOnly from './components/ClientOnly'
import Modal from './components/Modal/Modal'
import { Navbar } from './components/Navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'AirBnb Clone',
  description: 'AirBnb Clone using Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClientOnly>
        <Modal isOpen title='Modal' />
        <Navbar />
      </ClientOnly>
      <body className={nunito.className}>{children}</body>
    </html>
  )
}
