package com.autoinfra.service;

import org.springframework.stereotype.Service;

@Service
public class AnalysisService {
    
    public AnalysisResult analyzeLog(String log) {
        String lowerLog = log.toLowerCase();
        
        if (containsPortConflict(lowerLog)) {
            return new AnalysisResult(
                "Port conflict",
                "Another process is already using the required network port.",
                "Stop the conflicting process or change the application port configuration."
            );
        } else if (lowerLog.contains("exception")) {
            return new AnalysisResult(
                "Java runtime exception",
                "The application threw an exception during execution.",
                "Inspect the stack trace and verify object initialization or null references."
            );
        } else if (lowerLog.contains("docker")) {
            return new AnalysisResult(
                "Docker/container issue",
                "The container failed due to configuration or runtime problems.",
                "Verify Docker daemon status, image validity, environment variables, and port mappings."
            );
        } else if (containsBuildFailure(log)) {
            return new AnalysisResult(
                "Build failure",
                "The build process failed due to dependency or plugin issues.",
                "Rebuild with debug flags and check dependency resolution or plugin configuration."
            );
        } else {
            return new AnalysisResult(
                "Unknown error",
                "No known error pattern detected.",
                "Inspect the complete logs and system configuration."
            );
        }
    }
    
    private boolean containsPortConflict(String log) {
        return log.contains("port") && 
               (log.contains("already in use") || log.contains("address already in use"));
    }
    
    private boolean containsBuildFailure(String log) {
        return log.contains("BUILD FAILURE") || log.contains("Failed to execute goal");
    }
    
    public static class AnalysisResult {
        private String rootCause;
        private String explanation;
        private String fix;
        
        public AnalysisResult(String rootCause, String explanation, String fix) {
            this.rootCause = rootCause;
            this.explanation = explanation;
            this.fix = fix;
        }
        
        public String getRootCause() {
            return rootCause;
        }
        
        public void setRootCause(String rootCause) {
            this.rootCause = rootCause;
        }
        
        public String getExplanation() {
            return explanation;
        }
        
        public void setExplanation(String explanation) {
            this.explanation = explanation;
        }
        
        public String getFix() {
            return fix;
        }
        
        public void setFix(String fix) {
            this.fix = fix;
        }
    }
}
