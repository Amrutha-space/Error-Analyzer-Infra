import { useState } from 'react'

function App() {
  const [logText, setLogText] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState('analyzer')
  const [activeSidebarItem, setActiveSidebarItem] = useState('analyzer')

  const analyzeLog = async () => {
    if (!logText.trim()) {
      setError('Please enter some log text to analyze')
      return
    }

    setLoading(true)
    setError('')
    setResponse(null)

    try {
      const res = await fetch('http://localhost:8080/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ log: logText }),
      })

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      setResponse(data)
    } catch (err) {
      setError('Failed to connect to backend. Make sure the Spring Boot server is running on localhost:8080')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  const sampleLogs = [
    {
      title: 'Port Conflict',
      content: 'Port 8080 is already in use',
      description: 'Common issue when multiple services try to use the same port'
    },
    {
      title: 'Java Exception', 
      content: 'java.lang.NullPointerException at com.example.MyClass.method',
      description: 'Runtime exception that occurs when trying to use a null reference'
    },
    {
      title: 'Docker Issue',
      content: 'docker: Error response from daemon: container failed to start',
      description: 'Container runtime errors during Docker operations'
    },
    {
      title: 'Build Failure',
      content: '[ERROR] BUILD FAILURE\n[ERROR] Failed to execute goal',
      description: 'Maven/Gradle build process failures due to various issues'
    }
  ]

  const handleSidebarClick = (item) => {
    setActiveSidebarItem(item)
    if (item === 'analyzer') setActiveTab('analyzer')
    else if (item === 'samples') setActiveTab('samples')
    else if (item === 'about') setActiveTab('about')
  }

  return (
    <div className="container">
      <div className="background-gradient"></div>
      <div className="background-pattern"></div>
      
      <header className="header">
        <div className="header-content">
          <div className="title-section">
            <div className="logo">EA</div>
            <div>
              <h1 className="title">Error Analyzer Infra</h1>
              <p className="subtitle">Smart Debug Assistant</p>
            </div>
          </div>
          <nav className="header-nav">
            <a href="#" className="nav-link">Dashboard</a>
            <a href="#" className="nav-link">Analytics</a>
            <a href="#" className="nav-link">Documentation</a>
          </nav>
        </div>
      </header>

      <div className="main-layout">
        <aside className="sidebar">
          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <a 
                href="#" 
                className={`sidebar-link ${activeSidebarItem === 'analyzer' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleSidebarClick('analyzer')
                }}
              >
                <span className="sidebar-icon">🔍</span>
                Error Analyzer
              </a>
            </li>
            <li className="sidebar-item">
              <a 
                href="#" 
                className={`sidebar-link ${activeSidebarItem === 'samples' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleSidebarClick('samples')
                }}
              >
                <span className="sidebar-icon">📝</span>
                Sample Logs
              </a>
            </li>
            <li className="sidebar-item">
              <a 
                href="#" 
                className={`sidebar-link ${activeSidebarItem === 'about' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleSidebarClick('about')
                }}
              >
                <span className="sidebar-icon">ℹ️</span>
                About
              </a>
            </li>
          </ul>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">1.2K</div>
              <div className="stat-label">Errors Analyzed</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">98%</div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Availability</div>
            </div>
          </div>
        </aside>

        <main className="content-area">
          {activeTab === 'analyzer' && (
            <>
              <div className="hero-section">
                <h2 className="hero-title">Debug Errors Smarter,  Not Harder </h2>
                <p className="hero-subtitle">
                  Transform complex error logs into actionable insights with AI-powered analysis. 
                  Get instant solutions for your technical problems.
                </p>
                
                <div className="hero-features">
                  <div className="hero-feature">
                    <span className="hero-feature-icon">⚡</span>
                    <h3>Lightning Fast</h3>
                    <p>Analyze errors in seconds, not hours</p>
                  </div>
                  <div className="hero-feature">
                    <span className="hero-feature-icon">🎯</span>
                    <h3>Accurate Results</h3>
                    <p>98% accuracy rate with proven algorithms</p>
                  </div>
                  <div className="hero-feature">
                    <span className="hero-feature-icon">🔧</span>
                    <h3>Actionable Solutions</h3>
                    <p>Get step-by-step fix instructions</p>
                  </div>
                </div>
              </div>

              <div className="tabs">
                <button 
                  className={`tab ${activeTab === 'analyzer' ? 'active' : ''}`}
                  onClick={() => setActiveTab('analyzer')}
                >
                  🔍 Error Analyzer
                </button>
                <button 
                  className={`tab ${activeTab === 'samples' ? 'active' : ''}`}
                  onClick={() => setActiveTab('samples')}
                >
                  📝 Sample Logs
                </button>
                <button 
                  className={`tab ${activeTab === 'about' ? 'active' : ''}`}
                  onClick={() => setActiveTab('about')}
                >
                  ℹ️ About
                </button>
              </div>
            </>
          )}

          <div className="tab-content">
            {activeTab === 'analyzer' && (
              <div className="analyzer-tab">
                <div className="input-section">
                  <div className="input-header">
                    <h3>Analyze Your Error Log</h3>
                    <p>Paste your technical errors, stack traces, or logs below for instant AI-powered analysis</p>
                  </div>
                  
                  <textarea
                    className="textarea"
                    placeholder="Paste your error logs here... 
Example: java.lang.NullPointerException at com.example.MyClass.method"
                    value={logText}
                    onChange={(e) => setLogText(e.target.value)}
                  />
                  
                  <button 
                    className="button" 
                    onClick={analyzeLog}
                    disabled={loading}
                  >
                    {loading && <span className="loading"></span>}
                    {loading ? 'Analyzing...' : '🚀 Analyze Error'}
                  </button>
                </div>

                {error && (
                  <div className="error">
                    ⚠️ {error}
                  </div>
                )}

                {response && (
                  <div className="response-section">
                    <h2 className="response-title">🎯 Analysis Results</h2>
                    
                    <div className="response-grid">
                      <div className="response-card root-cause">
                        <div className="card-header">
                          <span className="card-icon">🔍</span>
                          <h4>Root Cause</h4>
                        </div>
                        <div className="card-content">{response.rootCause}</div>
                      </div>
                      
                      <div className="response-card explanation">
                        <div className="card-header">
                          <span className="card-icon">💡</span>
                          <h4>Explanation</h4>
                        </div>
                        <div className="card-content">{response.explanation}</div>
                      </div>
                      
                      <div className="response-card fix">
                        <div className="card-header">
                          <span className="card-icon">🔧</span>
                          <h4>Solution</h4>
                        </div>
                        <div className="card-content">{response.fix}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'samples' && (
              <div className="samples-tab">
                <h3>Sample Error Logs</h3>
                <p>Explore common error patterns. Click on any sample to load it into the analyzer:</p>
                
                <div className="sample-grid">
                  {sampleLogs.map((sample, index) => (
                    <div 
                      key={index}
                      className="sample-card"
                      onClick={() => {
                        setLogText(sample.content)
                        setActiveTab('analyzer')
                        setActiveSidebarItem('analyzer')
                      }}
                    >
                      <h4>{sample.title}</h4>
                      <p style={{color: '#9ca3af', fontSize: '0.9rem', marginBottom: '1rem'}}>
                        {sample.description}
                      </p>
                      <pre>{sample.content}</pre>
                      <div className="sample-action">Click to analyze →</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="about-tab">
                <div className="about-content">
                  <h3>About Error Infra</h3>
                  <p>
                    Error Infra is an intelligent error debugging assistant designed specifically for developers 
                    and IT professionals. Our advanced AI algorithms analyze technical errors, stack traces, 
                    and system logs to provide instant, actionable solutions.
                  </p>
                  
                  <p>
                    Built with cutting-edge technology and designed for production environments, 
                    AutoInfra helps you save countless hours of debugging time by quickly identifying 
                    the root cause of issues and providing clear step-by-step solutions.
                  </p>
                  
                  <div className="features-grid">
                    <div className="feature-card">
                      <span className="feature-icon">⚡</span>
                      <h4>Instant Analysis</h4>
                      <p>Get immediate insights into your error logs with AI-powered analysis that processes complex patterns in seconds</p>
                    </div>
                    
                    <div className="feature-card">
                      <span className="feature-icon">🎯</span>
                      <h4>Pattern Recognition</h4>
                      <p>Advanced machine learning algorithms identify common error patterns and known issues across multiple programming languages</p>
                    </div>
                    
                    <div className="feature-card">
                      <span className="feature-icon">🔧</span>
                      <h4>Actionable Solutions</h4>
                      <p>Receive clear, step-by-step instructions to resolve technical issues with proven solutions from our knowledge base</p>
                    </div>
                    
                    <div className="feature-card">
                      <span className="feature-icon">🚀</span>
                      <h4>Production Ready</h4>
                      <p>Built with enterprise-grade tools and designed for high-availability environments with 99.9% uptime guarantee</p>
                    </div>
                  </div>
                  
                  <div className="tech-stack">
                    <h4>Technology Stack</h4>
                    <div className="tech-badges">
                      <span className="tech-badge">Java 17</span>
                      <span className="tech-badge">Spring Boot</span>
                      <span className="tech-badge">React 18</span>
                      <span className="tech-badge">Vite</span>
                      <span className="tech-badge">AI/ML</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Error Analyzer Infra</h4>
            <p>
              Intelligent error debugging assistant for developers and IT professionals. 
              Transform complex errors into actionable solutions instantly.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <span>📧</span>
              </a>
              <a href="#" className="social-link">
                <span>🐦</span>
              </a>
              <a href="#" className="social-link">
                <span>💼</span>
              </a>
              <a href="#" className="social-link">
                <span>🐙</span>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Product</h4>
            <ul className="footer-links">
              <li><a href="#">Features</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Reference</a></li>
              <li><a href="#">Pricing</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Company</h4>
            <ul className="footer-links">
              <li><a href="#">About Project</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Status</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>Error Analyzer Infra | Built by Amrutha A | Project is built as an Open Source Tool. </p>
        </div>
      </footer>
    </div>
  )
}

export default App
