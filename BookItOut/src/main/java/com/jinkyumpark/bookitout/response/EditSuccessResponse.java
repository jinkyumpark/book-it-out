package com.jinkyumpark.bookitout.response;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.OK)
public class EditSuccessResponse extends CrudResponse{
    public EditSuccessResponse(String path) {
        super("성공적으로 수정했어요", HttpStatus.OK.value(), path);
    }

    public EditSuccessResponse(String path, String message) {
        super(message, HttpStatus.OK.value(), path);
    }
}
