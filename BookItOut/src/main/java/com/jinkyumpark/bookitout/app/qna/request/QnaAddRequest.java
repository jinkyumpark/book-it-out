package com.jinkyumpark.bookitout.app.qna.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@AllArgsConstructor @NoArgsConstructor
@Getter @Setter
public class QnaAddRequest {
    @NotNull
    @NotBlank
    private String question;

    private Long appUserId;
    private String password;
}
