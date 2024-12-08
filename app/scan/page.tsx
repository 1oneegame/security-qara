'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, AlertTriangle, CheckCircle, XCircle, Shield, Globe, Server, Database } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface VulnerabilityResponse {
  status: string;
  target: string;
  exploits: string[];
  vulnerableServices: string[];
  additionalInfo: {
    network: string[];
    geolocation: string;
    dns: string[];
  };
  summary: {
    openPorts: number;
    potentialVulnerabilities: number;
    networkHops: number;
    hasDnsRecords: boolean;
    location: string;
  };
}

interface ScanResult extends VulnerabilityResponse {
  timestamp: string;
}

const TerminalLoader = () => {
  const [text, setText] = useState('')
  const fullText = '> Сканирование IP...\n> Проверка уязвимостей...\n> Анализ результатов...'

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setText(fullText.slice(0, i))
      i++
      if (i > fullText.length) {
        i = 0
      }
    }, 100)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="font-mono text-sm text-green-400 bg-green-900/20 p-4 rounded-md h-24 overflow-hidden">
      {text}
    </div>
  )
}

export default function IPVulnerabilityChecker() {
  const [ipParts, setIpParts] = useState(['', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<ScanResult[]>([])
  const [selectedResult, setSelectedResult] = useState<ScanResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleIpChange = (index: number, value: string) => {
    const newIpParts = [...ipParts]
    newIpParts[index] = value.replace(/\D/g, '').slice(0, 3)
    setIpParts(newIpParts)
  }

  const formatLocation = (summary: VulnerabilityResponse['summary']) => {
    const location: string[] = []
    if (summary.location) {
      const parts = summary.location.split(' ')
      parts.forEach(part => {
        if (part.includes(':')) {
          const [key, value] = part.split(':')
          if (value && value !== 'None') {
            location.push(`${key}: ${value}`)
          }
        }
      })
    }
    return location.join(', ') || 'Н/Д'
  }

  const checkVulnerability = async () => {
    const ip = ipParts.join('.')
    if (ip.split('.').filter(Boolean).length !== 4) {
      setError('Пожалуйста, введите корректный IP-адрес')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:9090/api/scan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ target: ip })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: VulnerabilityResponse = await response.json()
      const newResult: ScanResult = {
        ...data,
        timestamp: new Date().toLocaleString('ru-RU')
      }
      
      setResults(prev => [...prev, newResult])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при сканировании')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black p-4 sm:p-8">
      <Card className="max-w-4xl mx-auto bg-black/50 border-green-500 mt-24">
        <CardHeader>
          <CardTitle className="text-3xl sm:text-4xl font-bold text-green-400 text-center">
            Проверка уязвимостей IP
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {ipParts.map((part, index) => (
                <Input
                  key={index}
                  placeholder="000"
                  value={part}
                  onChange={(e) => handleIpChange(index, e.target.value)}
                  className="w-16 text-center bg-black border-green-500 text-green-400 placeholder-green-700"
                  maxLength={3}
                />
              ))}
              <Button 
                onClick={checkVulnerability}
                disabled={isLoading || ipParts.some(part => part === '')}
                className="bg-green-700 hover:bg-green-600 text-white font-medium"
              >
                {isLoading ? <Search className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                Проверить
              </Button>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-red-400 flex items-center justify-center space-x-2 bg-red-900/20 p-3 rounded-md"
                >
                  <AlertTriangle className="h-5 w-5" />
                  <span>{error}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {isLoading && <TerminalLoader />}

            {results.length > 0 && (
              <div className="mt-8">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-green-400">IP адрес</TableHead>
                      <TableHead className="text-green-400">Статус</TableHead>
                      <TableHead className="text-green-400">Открытые порты</TableHead>
                      <TableHead className="text-green-400">Уязвимости</TableHead>
                      <TableHead className="text-green-400">Местоположение</TableHead>
                      <TableHead className="text-green-400">Время проверки</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.map((result, index) => (
                      <TableRow 
                        key={`${result.target}-${index}`}
                        onClick={() => setSelectedResult(result)}
                        className="cursor-pointer hover:bg-green-900/20"
                      >
                        <TableCell className="text-green-400">{result.target}</TableCell>
                        <TableCell>
                          {result.status === 'not_vulnerable' ? (
                            <span className="flex items-center space-x-2 text-green-400">
                              <CheckCircle className="h-4 w-4" />
                              <span>Не уязвим</span>
                            </span>
                          ) : (
                            <span className="flex items-center space-x-2 text-red-400">
                              <XCircle className="h-4 w-4" />
                              <span>Уязвим</span>
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-green-400">{result.summary.openPorts}</TableCell>
                        <TableCell className="text-green-400">{result.summary.potentialVulnerabilities}</TableCell>
                        <TableCell className="text-green-400">{formatLocation(result.summary)}</TableCell>
                        <TableCell className="text-green-400">{result.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <AnimatePresence>
              {selectedResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 mt-8"
                >
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-green-400">
                      Результаты для {selectedResult.target}
                    </h2>
                    {selectedResult.status === 'not_vulnerable' ? (
                      <div className="flex items-center space-x-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Не уязвим</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 bg-red-500/20 text-red-400 px-3 py-1 rounded-full">
                        <XCircle className="h-5 w-5" />
                        <span className="font-medium">Уязвим</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="bg-black/30 border-green-500">
                      <CardHeader>
                        <CardTitle className="text-lg font-medium text-green-400 flex items-center">
                          <Shield className="h-5 w-5 mr-2" />
                          Сводка
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-white">
                        <ul className="space-y-2">
                          <li>Открытые порты: {selectedResult.summary.openPorts}</li>
                          <li>Потенциальные уязвимости: {selectedResult.summary.potentialVulnerabilities}</li>
                          <li>Сетевые переходы: {selectedResult.summary.networkHops}</li>
                          <li>Наличие DNS-записей: {selectedResult.summary.hasDnsRecords ? 'Да' : 'Нет'}</li>
                          <li>Местоположение: {selectedResult.summary.location}</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="bg-black/30 border-green-500">
                      <CardHeader>
                        <CardTitle className="text-lg font-medium text-green-400 flex items-center">
                          <Globe className="h-5 w-5 mr-2" />
                          Дополнительная информация
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-white">
                        <ul className="space-y-2">
                          <li>Сеть: {selectedResult.additionalInfo.network.join(', ') || 'Н/Д'}</li>
                          <li>Геолокация: {selectedResult.additionalInfo.geolocation}</li>
                          <li>DNS: {selectedResult.additionalInfo.dns.join(', ')}</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {selectedResult.exploits.length > 0 && (
                    <Card className="bg-black/30 border-green-500">
                      <CardHeader>
                        <CardTitle className="text-lg font-medium text-green-400 flex items-center">
                          <Server className="h-5 w-5 mr-2" />
                          Потенциальные эксплойты
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-white">
                        <ul className="space-y-2">
                          {selectedResult.exploits.map((exploit: string, index: number) => (
                            <li key={index} className="bg-green-900/30 p-2 rounded">{exploit}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {selectedResult.vulnerableServices.length > 0 && (
                    <Card className="bg-black/30 border-green-500">
                      <CardHeader>
                        <CardTitle className="text-lg font-medium text-green-400 flex items-center">
                          <Database className="h-5 w-5 mr-2" />
                          Уязвимые сервисы
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-white">
                        <ul className="space-y-2">
                          {selectedResult.vulnerableServices.map((service: string, index: number) => (
                            <li key={index} className="bg-green-900/30 p-2 rounded">{service}</li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

