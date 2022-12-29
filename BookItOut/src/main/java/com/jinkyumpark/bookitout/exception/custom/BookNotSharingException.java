package com.jinkyumpark.bookitout.exception.custom;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class BookNotSharingException extends RuntimeException {
    public BookNotSharingException() {
        super("해당 책은 주인이 공유를 허용하지 않으셨어요");
    }

    public BookNotSharingException(String message) {
        super(message);
    }
}
