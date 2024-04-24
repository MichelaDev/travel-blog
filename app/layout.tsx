import { quicksand } from '../fonts'
import './globals.css'
import type { Metadata } from 'next'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en" translate='no'>
      <body className={`bg-primary ${quicksand.className}`}>
        {children}
      </body>
    </html>
  )
}
