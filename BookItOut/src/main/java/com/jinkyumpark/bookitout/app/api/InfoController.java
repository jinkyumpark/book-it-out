package com.jinkyumpark.bookitout.app.api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/")
public class InfoController {
    @GetMapping
    public Map<String, Object> root() {
        Map<String, Object> response = new HashMap<>();

        response.put("timestamp", new Date());
        response.put("message", "Private API for book-it-out");

        return response;
    }
}
