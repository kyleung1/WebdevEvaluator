import "../styles/globals.css";
import Header from "./(components)/Header";
import Footer from "./(components)/Footer";
import Hero from "./(components)/Hero";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body className="font-ubuntu flex flex-col min-h-screen min-w-screen bg-slate-900">
        {children}
        <div className="flex-shrink-0">
          <Footer/>
        </div>
      </body>
    </html>
  )
}
