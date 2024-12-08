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
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-black flex-col justify-between p-12">
        <div>
        </div>
        <div className="space-y-4">
          <p className="text-xl text-white/90 leading-relaxed">
            "Безопасность - это не просто функция, это фундамент доверия между людьми в цифровом мире"
          </p>
          <p className="text-white/60">Команда QARA</p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-white">
        <AuthForm />
      </div>
    </div>
  );
}
