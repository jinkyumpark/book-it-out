package com.jinkyumpark.bookitout.exception.common;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NO_CONTENT)
public class NoContentException extends RuntimeException {
    public NoContentException() {
        super("해당 리소스를 찾을 수 없어요");
    }

    public NoContentException(String message) {
        super(message);
    }
}
