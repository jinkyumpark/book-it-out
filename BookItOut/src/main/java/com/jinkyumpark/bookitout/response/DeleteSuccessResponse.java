package com.jinkyumpark.bookitout.response;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.OK)
public class DeleteSuccessResponse extends CrudResponse{
    public DeleteSuccessResponse(String path) {
        super("요청하신 리소스를 삭제했어요", HttpStatus.OK.value(), path);
    }

    public DeleteSuccessResponse(String path, String message) {
        super(message, HttpStatus.OK.value(), path);
    }
}
