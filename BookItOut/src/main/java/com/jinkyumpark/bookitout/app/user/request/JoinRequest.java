package com.jinkyumpark.bookitout.app.user.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@NoArgsConstructor @AllArgsConstructor
@Getter
public class JoinRequest {
    @NotNull
    @NotBlank(message = "이메일을 입력해 주세요")
    @Email
    private String email;

    @NotNull
    @NotBlank(message = "비밃번호를 입력해 주세요")
    @Length(min = 6, message = "6자 이상의 비밀번호를 입력해 주세요")
    private String password;

    @NotNull
    @NotBlank(message = "이름을 입력해 주세요")
    private String name;

    @NotNull
    private Integer code;
}