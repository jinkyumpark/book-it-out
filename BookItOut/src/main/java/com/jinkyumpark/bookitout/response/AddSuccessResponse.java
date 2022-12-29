package com.jinkyumpark.bookitout.response;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@Getter
@ResponseStatus(HttpStatus.CREATED)
public class AddSuccessResponse extends CrudResponse{
    public AddSuccessResponse(String path) {
        super("성공적으로 추가했어요!", HttpStatus.CREATED.value(), path);
    }

    public AddSuccessResponse(String path, String message) {
        super(message, HttpStatus.CREATED.value(), path);
    }
}
