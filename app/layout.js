
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import './globals.css'
import './resp.css'
import 'remixicon/fonts/remixicon.css'
import ReduxProvider from '@/provider/redux/ReduxProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VTU GPT',
  description: 'VTU GPT',
}

export default function RootLayout({ children }) {
  return (
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          <Sidebar />
          <main>
            {children}
          </main>
        </body>
      </html>
    </ReduxProvider>
  )
}
