import Script from 'next/script'
import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  metadataBase: new URL ("https://www.carmiaround.com"),
  title: {
    default: 'CARMI AROUND',
    template: `%s | CARMI AROUND`
  },
  description: 'Explore the world with Carmi - A travel blog sharing adventures, tips, and stories from around the globe.',
  keywords: "travel, adventure, exploration, Carmi Around, blog, solo travel, backpacking",
  verification: {
    google: '7cdb730146362664015b54c3e4c781921b14685c2caa8862c4afaa4c000d42c7',
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "en-US",
      "it-IT": "it-IT"
    }
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const DynamicComponentWithNoSSR = dynamic(
    () => import('../../components/ScrollObserver'),
    { ssr: false }
  )

  return (
    <>
      <Header />
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-BQNYEH30WT" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-BQNYEH30WT');
        `}
      </Script>
      <Script id="iubenda" type="text/javaScript">
        {`var _iub = _iub || [];
        _iub.csConfiguration = {
          "askConsentAtCookiePolicyUpdate":true,
          "enableFadp":true,
          "enableLgpd":true,
          "enableUspr":true,
          "fadpApplies":true,
          "floatingPreferencesButtonDisplay":"anchored-center-right",
          "lang":"en",
          "perPurposeConsent":true,
          "siteId":3341390,
          "usprApplies":true,
          "whitelabel":false,
          "cookiePolicyId":56183306, 
          "banner":{ 
            "acceptButtonDisplay":true,
            "closeButtonDisplay":false,
            "customizeButtonDisplay":true,
            "explicitWithdrawal":true,
            "listPurposes":true,
            "position":"float-bottom-right",
            "rejectButtonDisplay":true 
        }};`}
      </Script>
      <Script type="text/javaScript" src="https://cs.iubenda.com/autoblocking/3341390.js"></Script>
      <Script type="text/javaScript" src="//cdn.iubenda.com/cs/gpp/stub.js"></Script>
      <Script type="text/javaScript" src="//cdn.iubenda.com/cs/iubenda_cs.js" async></Script>
      <DynamicComponentWithNoSSR />
      {children}
      <div id='scrollToBtn' style={{position: "-webkit-sticky"}} className='sticky w-max p-4 md:p-6 bottom-[0] left-full flex justify-end items-center'></div>
      <Footer />
    </>
  )
}
