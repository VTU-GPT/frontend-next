
import { Inter } from 'next/font/google'
import './globals.css'
import './resp.css'
import 'remixicon/fonts/remixicon.css'
import ReduxProvider from '@/provider/redux/ReduxProvider'
import Sidebar from '@/components/Sidebar'

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
            {children}
        </body>
      </html>
    </ReduxProvider>
  )
}
