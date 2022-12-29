package com.jinkyumpark.bookitout.exception.core;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.ZonedDateTime;

@AllArgsConstructor
@Getter
@Setter
public class ExceptionResponse {
    private String message;
    private HttpStatus httpStatus;
    private ZonedDateTime zonedDateTime;
}
