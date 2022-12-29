package com.jinkyumpark.bookitout.app.user.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor
@Getter
@Setter
public class EmailPasswordLoginRequest {
    @NotNull
    @NotBlank(message = "이메일을 입력해 주세요")
    @Email(message = "올바른 형식의 이메일을 입력해 주세요")
    private String email;

    @NotNull
    @NotBlank(message = "비밀번호를 입력해 주세요")
    @Min(value = 6, message = "6자 이상의 비밀번호를 입력해 주세요")
    private String password;

    private Boolean stayLogin = false;
}
