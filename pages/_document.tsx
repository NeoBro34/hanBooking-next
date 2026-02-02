import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html>
      <Head>
        <meta charSet='UTF-8' />
        <meta name='title' content='HanBooking' />
        <meta name='robots' content='index, follow' />
        <link rel='icon' type='image/png' href='img/logo/titlelogo.png' />
        <meta name='keyword' content={"hanbooking, HanBooking.uz, devex mern, mern. nestjs fullstack"}/>
        <meta name='description' 
          content={
            'HanBooking is a modern hotel booking platform in South Korea that helps you find the best hotels across quickly and securely. Whether you are traveling for business, family vacations, or halal tourism, HanBooking offers trusted hotels with transparent prices and easy online booking.| ' + 
            'HanBooking — это современная платформа для бронирования отелей в Южной Корее, которая помогает быстро и безопасно найти лучшие отели по всей стране. Независимо от того, путешествуете ли вы по делам, на семейный отдых или занимаетесь халяльным туризмом, HanBooking предлагает проверенные отели с прозрачными ценами и удобным онлайн-бронированием. | ' + 
            'HanBooking은 한국의 최첨단 호텔 예약 플랫폼으로, 빠르고 안전하게 최고의 호텔을 찾을 수 있도록 도와줍니다. 비즈니스 여행, 가족 휴가, 할랄 관광 등 어떤 목적의 여행이든 한부킹은 투명한 가격과 간편한 온라인 예약 시스템을 갖춘 믿을 수 있는 호텔들을 제공합니다.'
          }/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}