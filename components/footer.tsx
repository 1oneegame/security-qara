import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const Footer: React.FC = () => {
  return (
    <div className="w-full bg-black">
      <Card className="bg-black border-none">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-green-400 mb-4 md:mb-0">
              © 2024 Security Qara. Все права защищены.
            </div>
            <div className="flex space-x-4">
              <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500 hover:text-black">
                Условия использования
              </Button>
              <Button variant="outline" className="border-green-500 text-green-400 hover:bg-green-500 hover:text-black">
                Политика конфиденциальности
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Footer
