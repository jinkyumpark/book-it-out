package com.jinkyumpark.bookitout.app.user.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter

@ResponseStatus(HttpStatus.CREATED)
public class JoinSuccessResponse {
    private LocalDateTime timestamp = LocalDateTime.now();
    private Integer status = HttpStatus.CREATED.value();
    private String message = "해당 이메일과 비밀번호로 가입됐어요";
    private String path = "/v1/join";

    public JoinSuccessResponse(String message, String path) {
        this.message = message;
        this.path = path;
    }
}
