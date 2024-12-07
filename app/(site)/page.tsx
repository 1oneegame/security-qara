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
        <AuthForm/>
  );
}
