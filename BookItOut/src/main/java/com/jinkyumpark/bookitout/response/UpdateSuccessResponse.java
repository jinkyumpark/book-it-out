package com.jinkyumpark.bookitout.response;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.ACCEPTED)
public class UpdateSuccessResponse extends CrudResponse {
    public UpdateSuccessResponse(String path) {
        super("업데이트 했어요", HttpStatus.ACCEPTED.value(), path);
    }

    public UpdateSuccessResponse(String path, String message) {
        super(message, HttpStatus.ACCEPTED.value(), path);
    }
}