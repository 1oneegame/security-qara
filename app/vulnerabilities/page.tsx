'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RefreshCw, Search, AlertTriangle, ChevronRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface AffectedPackage {
  name: string;
  ecosystem: string;
  vulnerable_versions: string;
  patched_version: string;
}

interface Vulnerability {
  id: string;
  title: string;
  description: string;
  published: string;
  severity: string;
  source: string;
  cvss_score: number;
  cvss_vector: string;
  affected_packages: AffectedPackage[];
  cve_id?: string | null;
  references?: string[];
}

export default function VulnerabilityDashboard() {
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchVulnerabilities = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('http://localhost:9090/api/vulnerabilities')
      if (!response.ok) {
        throw new Error('Failed to fetch vulnerabilities')
      }
      const data = await response.json()
      setVulnerabilities(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      console.error('Error fetching vulnerabilities:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchVulnerabilities()
  }, [])

  const updateList = () => {
    fetchVulnerabilities()
  }

  const filteredVulnerabilities = vulnerabilities.filter(vuln => 
    vuln.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black pt-12">
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <header className="mb-12">
          <div className="flex items-center space-x-6">
            <div className="flex-1 relative">
              <Input
                placeholder="Search vulnerabilities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-0 border-b border-white/20 rounded-none 
                          text-white placeholder:text-white/40 focus:border-white focus:ring-0 
                          pl-0 text-lg transition-all"
              />
              <Search className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
            </div>
            <Button 
              onClick={updateList}
              variant="ghost"
              className="p-2 hover:bg-white/5"
            >
              <RefreshCw className={`h-5 w-5 text-white/80 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </header>
        {error && (
          <div className="mb-8 p-4 border border-red-500/20 bg-red-500/5 text-red-400 flex items-center space-x-3">
            <AlertTriangle className="h-5 w-5" />
            <span>{error}</span>
          </div>
        )}
        <div className="space-y-4">
          <AnimatePresence>
            {filteredVulnerabilities.map((vuln) => (
              <motion.div
                key={vuln.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="group"
              >
                <div 
                  onClick={() => setSelectedVuln(selectedVuln?.id === vuln.id ? null : vuln)}
                  className="cursor-pointer border border-white/10 hover:border-white/20 
                            transition-all duration-200 bg-white/[0.02] hover:bg-white/[0.04]"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <h2 className="text-xl text-white font-light">{vuln.title}</h2>
                        <div className="flex items-center space-x-4 text-sm text-white/60">
                          <span>{vuln.id}</span>
                          {vuln.cve_id && (
                            <span className="text-white/80">{vuln.cve_id}</span>
                          )}
                          {vuln.severity && (
                            <span className={`
                              px-2 py-0.5 text-xs uppercase tracking-wider
                              ${vuln.severity === 'high' ? 'bg-red-500/20 text-red-400' : 
                                vuln.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 
                                'bg-blue-500/20 text-blue-400'}
                            `}>
                              {vuln.severity}
                            </span>
                          )}
                          {vuln.cvss_score > 0 && (
                            <span className="bg-white/10 px-2 py-0.5 text-xs">
                              CVSS: {vuln.cvss_score}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className={`h-5 w-5 text-white/40 transform transition-transform duration-200
                        ${selectedVuln?.id === vuln.id ? 'rotate-90' : 'group-hover:translate-x-1'}`} 
                      />
                    </div>
                  </div>
                  {selectedVuln?.id === vuln.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-t border-white/10 p-6"
                    >
                      <div className="prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            h1: ({node, ...props}) => <h1 className="text-white text-2xl font-bold mt-8 mb-4" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-white text-xl font-bold mt-6 mb-3" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-white text-lg font-semibold mt-5 mb-2" {...props} />,
                            h4: ({node, ...props}) => <h4 className="text-white text-base font-semibold mt-4 mb-2" {...props} />,
                            h5: ({node, ...props}) => <h5 className="text-white text-sm font-semibold mt-3 mb-2" {...props} />,
                            h6: ({node, ...props}) => <h6 className="text-white text-sm font-semibold mt-3 mb-2" {...props} />,
                            
                            p: ({node, ...props}) => <p className="text-gray-300 mb-4" {...props} />,
                            strong: ({node, ...props}) => <strong className="text-white font-semibold" {...props} />,
                            em: ({node, ...props}) => <em className="italic" {...props} />,
                            del: ({node, ...props}) => <del className="line-through" {...props} />,
                            
                            ul: ({node, ...props}) => <ul className="list-disc pl-4 my-2 space-y-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-4 my-2 space-y-1" {...props} />,
                            li: ({node, ...props}) => <li className="text-gray-300" {...props} />,
                            
                            a: ({node, ...props}) => (
                              <a 
                                className="text-white underline hover:text-gray-300 transition-colors" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                {...props} 
                              />
                            ),
                            
                            code: ({node, inline, className, children, ...props}) => {
                              const match = /language-(\w+)/.exec(className || '')
                              
                              const isJSON = (text: string) => {
                                try {
                                  JSON.parse(text);
                                  return true;
                                } catch {
                                  return false;
                                }
                              }

                              const formatJSON = (text: string) => {
                                try {
                                  return JSON.stringify(JSON.parse(text), null, 2);
                                } catch {
                                  return text;
                                }
                              }

                              return !inline && match ? (
                                <SyntaxHighlighter
                                  style={nord}
                                  language={match[1]}
                                  PreTag="div"
                                  className="rounded-none border border-white/20 !bg-black/50"
                                  {...props}
                                >
                                  {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                              ) : (
                                <code 
                                  className="text-white bg-white/10 rounded px-1 py-0.5 block whitespace-pre-wrap break-words max-w-full overflow-hidden font-mono text-sm" 
                                  style={{ wordBreak: 'break-word' }}
                                  {...props}
                                >
                                  {isJSON(String(children)) 
                                    ? formatJSON(String(children))
                                    : String(children).replace(/\\n/g, '\n')}
                                </code>
                              )
                            },
                            
                            blockquote: ({node, ...props}) => (
                              <blockquote className="border-l-2 border-white/20 pl-4 my-4 italic text-gray-400" {...props} />
                            ),
                            
                            table: ({node, ...props}) => (
                              <div className="overflow-x-auto my-4">
                                <table className="min-w-full border border-white/20" {...props} />
                              </div>
                            ),
                            thead: ({node, ...props}) => <thead className="bg-white/5" {...props} />,
                            tr: ({node, ...props}) => <tr className="border-b border-white/20" {...props} />,
                            th: ({node, ...props}) => <th className="px-4 py-2 text-left text-white" {...props} />,
                            td: ({node, ...props}) => <td className="px-4 py-2 text-gray-300" {...props} />,
                            
                            hr: ({node, ...props}) => <hr className="my-8 border-white/20" {...props} />,
                          }}
                        >
                          {vuln.description}
                        </ReactMarkdown>
                      </div>

                      {vuln.affected_packages && vuln.affected_packages.length > 0 && (
                        <div className="mt-8">
                          <h3 className="text-sm text-white/60 uppercase tracking-wider mb-4">
                            Affected Packages
                          </h3>
                          <div className="space-y-3">
                            {vuln.affected_packages.map((pkg, index) => (
                              <div 
                                key={index}
                                className="bg-white/[0.02] border border-white/10 p-4"
                              >
                                {typeof pkg === 'string' ? (
                                  <div className="text-white">{pkg}</div>
                                ) : (
                                  <>
                                    <div className="text-white mb-1">{pkg.name}</div>
                                    <div className="text-sm text-white/60">
                                      <span className="text-white/40">{pkg.ecosystem}</span>
                                      <span className="mx-2">•</span>
                                      <span className="text-red-400">{pkg.vulnerable_versions}</span>
                                      {pkg.patched_version && (
                                        <>
                                          <span className="mx-2">→</span>
                                          <span className="text-green-400">{pkg.patched_version}</span>
                                        </>
                                      )}
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {vuln.references && vuln.references.length > 0 && (
                        <div>
                          <h3 className="text-sm text-white/60 uppercase tracking-wider mb-4">
                            References
                          </h3>
                          <div className="space-y-2">
                            {vuln.references.map((ref, index) => (
                              <a
                                key={index}
                                href={ref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-sm text-white/80 hover:text-white truncate
                                         hover:bg-white/[0.02] p-2 -ml-2 transition-colors"
                              >
                                {ref}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

