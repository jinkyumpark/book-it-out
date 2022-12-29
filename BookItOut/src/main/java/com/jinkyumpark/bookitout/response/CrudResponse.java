package com.jinkyumpark.bookitout.response;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CrudResponse extends RuntimeException {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final Integer status;
    private final String path;

    public CrudResponse(String message, Integer status, String path) {
        super(message);
        this.status = status;
        this.path = path;
    }
}
