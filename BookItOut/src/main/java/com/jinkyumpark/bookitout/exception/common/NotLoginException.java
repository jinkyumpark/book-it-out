package com.jinkyumpark.bookitout.exception.common;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class NotLoginException extends RuntimeException {
    public NotLoginException() {
        super("로그인 해 주세요!");
    }

    public NotLoginException(String message) {
        super(message);
    }
}
