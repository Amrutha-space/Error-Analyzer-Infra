package com.autoinfra.controller;

import com.autoinfra.service.AnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "https://error-analyzer-infra-1.onrender.com")
@RestController
@RequestMapping("/api")
public class AnalysisController {
    
    @Autowired
    private AnalysisService analysisService;
    
    @PostMapping("/analyze")
    public ResponseEntity<AnalysisResponse> analyzeLog(@RequestBody AnalysisRequest request) {
        AnalysisService.AnalysisResult result = analysisService.analyzeLog(request.getLog());
        
        AnalysisResponse response = new AnalysisResponse(
            result.getRootCause(),
            result.getExplanation(),
            result.getFix()
        );
        
        return ResponseEntity.ok(response);
    }
    
    public static class AnalysisRequest {
        private String log;
        
        public String getLog() {
            return log;
        }
        
        public void setLog(String log) {
            this.log = log;
        }
    }
    
    public static class AnalysisResponse {
        private String rootCause;
        private String explanation;
        private String fix;
        
        public AnalysisResponse(String rootCause, String explanation, String fix) {
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
