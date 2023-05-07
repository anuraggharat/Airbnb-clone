
import ClientOnly from './components/ClientOnly'
import Modal from './components/Modal/Modal'
import RegisterModal from './components/Modal/RegisterModal'
import { Navbar } from './components/Navbar/Navbar'
import './globals.css'
import { Nunito } from 'next/font/google'
import ToastProvider from './providers/ToastProvider'
import LoginModal from './components/Modal/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import RentModal from './components/Modal/RentModal'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'AirBnb Clone',
  description: 'AirBnb Clone using Next.js',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">

      <body className={nunito.className}>
        <ClientOnly>
          <ToastProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
            <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}</body>
    </html>
  )
}
