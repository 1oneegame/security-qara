import Image from "next/image";
import { Button } from "@/components/ui/button";
import AuthForm from "./components/AuthForm";

const features = [
  {
    title: 'Удобство',
    description: 'Простой, интуитивный интерфейс.',
  },
  {
    title: 'Шифрование',
    description: 'Конфиденциальность и удаление данных по таймеру.',
  },
  {
    title: 'Безопасность',
    description: 'Данные защищены от перехвата и взлома.',
  },
  {
    title: 'Скорость',
    description: 'Сообщения приходят быстрее, чем в любом другом приложении.',
  },
  {
    title: 'Силушка',
    description: 'Нет ограничений на размер мультимедиа и чатов.',
  },
  {
    title: 'Открытость',
    description: 'Открытый исходный код для разработчиков.',
  }
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col py-12 sm:px-6 md:px-8 ">
        <div className="flex items-center space-x-2 mb-8 justify-center"> 
          <div className="flex flex-row items-center justify-center bg-white rounded-full"> 
          </div> 
          <Image className="w-24 h-24 text-black mt-12" src="/images/logo.png" alt="logo" width={128} height={128} />  
          <h1 className="text-9xl font-bold text-[#FFFFFF]">qara</h1>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-light text-[#9AA8AF] mb-2">Безопасное и удобное общение</p>
          <div className="flex flex-row space-x-2">
            <Button className="bg-white text-black px-4 rounded-sm font-light text-lg">Открыть Qara Web </Button>
            <Button className="bg-gray-700 text-white px-4  rounded-sm font-light text-lg">Скачать Qara</Button>
          </div>
        </div>
        <div className="">
          <h1 className="text-white text-3xl ml-32">Почему Qara?</h1>
          <div className="grid grid-col-3">
            <div>
              {
                features.map((feature, index) => (
                  <div key={index} className="rounded-[20px] p-10 flex items-start gap-8 min-h-[200px] relative bg-[#131415]">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[18px] font-bold mb-3 leading-tight text-white">
                        {feature.title}
                      </h3>
                      <p
                        className="text-[14px] leading-relaxed text-[#9AA8AF]"
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <AuthForm/>
      </div>
  );
}
