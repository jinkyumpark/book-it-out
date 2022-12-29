//package com.jinkyumpark.bookitout.exception.core;
//
//import com.jinkyumpark.bookitout.exception.common.BadRequestException;
//import com.jinkyumpark.bookitout.exception.common.ConflictException;
//import com.jinkyumpark.bookitout.exception.common.NotFoundException;
//import com.jinkyumpark.bookitout.exception.common.UnknownException;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.ControllerAdvice;
//import org.springframework.web.bind.annotation.ExceptionHandler;
//
//import java.time.ZonedDateTime;
//
//@ControllerAdvice
//public class ApplicationExceptionHandler {
//
//    @ExceptionHandler(BadRequestException.class)
//    public ResponseEntity<Object> handleBadRequestException(ApplicationException e) {
//        ExceptionResponse exceptionResponse = new ExceptionResponse(
//                e.getMessage(),
//                HttpStatus.BAD_REQUEST,
//                ZonedDateTime.now()
//        );
//
//        return new ResponseEntity<>(
//                exceptionResponse,
//                HttpStatus.BAD_REQUEST
//        );
//    }
//
//    @ExceptionHandler(NotFoundException.class)
//    public ResponseEntity<Object> handleNotFoundException(ApplicationException e) {
//        ExceptionResponse exceptionResponse = new ExceptionResponse(
//                e.getMessage(),
//                HttpStatus.NOT_FOUND,
//                ZonedDateTime.now()
//        );
//
//        return new ResponseEntity<>(
//                exceptionResponse,
//                HttpStatus.BAD_REQUEST
//        );
//    }
//
//    @ExceptionHandler(ConflictException.class)
//    public ResponseEntity<Object> handleConflictException(ApplicationException e) {
//        ExceptionResponse exceptionResponse = new ExceptionResponse(
//                e.getMessage(),
//                HttpStatus.CONFLICT,
//                ZonedDateTime.now()
//        );
//
//        return new ResponseEntity<>(
//                exceptionResponse,
//                HttpStatus.CONFLICT
//        );
//    }
//    @ExceptionHandler(UnknownException.class)
//    public ResponseEntity<Object> handleUnknownException(ApplicationException e) {
//        ExceptionResponse exceptionResponse = new ExceptionResponse(
//                e.getMessage() == null ? "알 수 없는 이유로 실패했어요. 다시 시도해 주세요." : e.getMessage(),
//                HttpStatus.INTERNAL_SERVER_ERROR,
//                ZonedDateTime.now()
//        );
//
//        return new ResponseEntity<>(
//                exceptionResponse,
//                HttpStatus.INTERNAL_SERVER_ERROR
//        );
//    }
//}
