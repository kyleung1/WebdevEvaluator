import "../styles/globals.css";
import Header from "./Header";
import Footer from "./Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="flex flex-col min-h-screen">
        <div className="flex-shrink-0">
          <Header/>
        </div>
        <div className="flex-1 mt-10">
          {children}
        </div>
        <div className="flex-shrink-0">
          <Footer/>
        </div>
        
      </body>
    </html>
  )
}
